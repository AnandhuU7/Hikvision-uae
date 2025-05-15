"use client";

import React, { useState, useEffect } from 'react';

interface SpecificationItem {
  name: string;
  value: string | { [key: string]: any }[];
}

interface SpecificationCategory {
  category: string;
  specs: SpecificationItem[];
}

interface ProductSpecificationsProps {
  specifications: SpecificationCategory[];
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    specifications?.[0]?.category || ''
  );

  // Debug: Log what we're receiving
  useEffect(() => {
    console.log("Specifications data:", JSON.stringify(specifications, null, 2));
  }, [specifications]);

  if (!specifications || specifications.length === 0) {
    return null;
  }
  
  // Helper function to extract specs from rich text bullet points
  const extractSpecsFromRichText = (richTextValue: any): Array<{name: string, value: string}> => {
    // Debug the incoming value
    console.log("Processing rich text value:", richTextValue);
    
    // For plain text values
    if (typeof richTextValue === 'string') {
      return parseSpecText(richTextValue);
    }
    
    // For rich text values, extract bullet points
    try {
      let bulletPoints: string[] = [];
      
      // Check if it's PayloadCMS's Lexical format
      if (richTextValue && richTextValue.root && richTextValue.root.children) {
        console.log("Detected Lexical format");
        const children = richTextValue.root.children;
        
        // Define interface for Lexical node structure
        interface LexicalNode {
          type?: string;
          children?: LexicalNode[];
          text?: string;
        }
        
        // Extract from Lexical lists
        children.forEach((node: LexicalNode) => {
          if (node.type === 'list') {
            node.children?.forEach(item => {
              if (item.children && Array.isArray(item.children)) {
                const text = item.children.map(c => c.text || '').join('');
                if (text.trim()) {
                  bulletPoints.push(text.trim());
                }
              }
            });
          } else if (node.children) {
            // Handle paragraphs
            const text = node.children.map(c => c.text || '').join('');
            if (text.trim()) {
              bulletPoints.push(text.trim());
            }
          }
        });
      } else {
        // Function to recursively find bullet points in rich text structure
        const findBulletPoints = (node: any) => {
          // Handle array of nodes
          if (Array.isArray(node)) {
            node.forEach(item => findBulletPoints(item));
            return;
          }
          
          // Handle list items (bullet points)
          if (node.type === 'li') {
            let text = '';
            const extractText = (n: any) => {
              if (typeof n === 'string') return n;
              if (n.text) return n.text;
              if (n.children && Array.isArray(n.children)) {
                return n.children.map(extractText).join('');
              }
              return '';
            };
            
            if (node.children) {
              text = extractText(node.children);
            }
            
            if (text.trim()) {
              bulletPoints.push(text.trim());
            }
            return;
          }
          
          // Handle children recursively
          if (node.children && Array.isArray(node.children)) {
            node.children.forEach((child: any) => findBulletPoints(child));
          }
        };
        
        // Process all nodes
        findBulletPoints(richTextValue);
        
        // If no bullet points were found, try to extract text as a whole
        if (bulletPoints.length === 0) {
          const fullText = extractFullText(richTextValue);
          if (fullText) {
            console.log("Extracted full text:", fullText);
            // Split by newlines in case they're using line breaks instead of bullets
            bulletPoints = fullText.split('\n').filter(line => line.trim() !== '');
          } else {
            // Last resort: try to extract from raw object by looking for text properties
            const textProps = findAllTextProps(richTextValue);
            if (textProps.length > 0) {
              console.log("Found text properties:", textProps);
              bulletPoints = textProps;
            } else {
              // Just use the plain string representation as a last resort
              const jsonText = JSON.stringify(richTextValue)
                .replace(/[{}"\\[\]]/g, '')
                .replace(/,/g, ' ')
                .replace(/:/g, ': ')
                .trim();
              if (jsonText && jsonText !== '') {
                bulletPoints = [jsonText];
              }
            }
          }
        }
      }
      
      console.log("Extracted bullet points:", bulletPoints);
      
      // Parse each bullet point into a spec object
      return bulletPoints.flatMap(point => parseSpecText(point));
    } catch (error) {
      console.error('Error extracting specs from rich text:', error);
      // For debugging - return a default value so we can see something
      return [{name: 'Debug', value: 'Error parsing rich text: ' + (error instanceof Error ? error.message : 'unknown error')}];
    }
  };
  
  // Extract full text from rich text value
  const extractFullText = (node: any): string => {
    if (typeof node === 'string') return node;
    if (node.text) return node.text;
    
    if (Array.isArray(node)) {
      return node.map(extractFullText).join(' ');
    }
    
    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractFullText).join(' ');
    }
    
    return '';
  };
  
  // Find all text properties in an object (in case the rich text format is different)
  const findAllTextProps = (obj: any, path: string = ''): string[] => {
    if (!obj || typeof obj !== 'object') return [];
    
    let results: string[] = [];
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const newPath = path ? `${path}.${key}` : key;
      
      if (key === 'text' && typeof value === 'string' && value.trim() !== '') {
        results.push(value.trim());
      } else if (typeof value === 'object') {
        results = results.concat(findAllTextProps(value, newPath));
      }
    });
    
    return results;
  };
  
  // Parse a line of text into a spec name/value pair
  const parseSpecText = (text: string): Array<{name: string, value: string}> => {
    if (!text || typeof text !== 'string') return [];
    
    // Try to split by colon first
    const colonIndex = text.indexOf(':');
    if (colonIndex > 0) {
      return [{
        name: text.substring(0, colonIndex).trim(),
        value: text.substring(colonIndex + 1).trim()
      }];
    }
    
    // Try to match common camera spec patterns
    const specPatterns = [
      /^(Image Sensor)\s*(.+)/i,
      /^(Max\.? Resolution)\s*(.+)/i,
      /^(Min\.? Illumination)\s*(.+)/i,
      /^(Shutter Time)\s*(.+)/i,
      /^(Day & Night)\s*(.+)/i,
      /^(Angle Adjustment)\s*(.+)/i,
      /^(Pan)\s*(.+)/i,
      /^(Focal Length)\s*(.+)/i,
      /^(Aperture)\s*(.+)/i,
      /^(Lens Mount)\s*(.+)/i,
      /^(IR cut filter)\s*(.+)/i,
    ];
    
    for (const pattern of specPatterns) {
      const match = text.match(pattern);
      if (match) {
        return [{
          name: match[1],
          value: match[2]
        }];
      }
    }
    
    // If we can't split it, just use the whole text as is
    return [{
      name: 'Specification',
      value: text
    }];
  };

  // Log what specs we're actually rendering
  const activeSpecs = specifications.find(cat => cat.category === activeCategory)?.specs || [];
  console.log("Active specs:", activeSpecs);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Specification</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row">
          {/* Categories sidebar */}
          <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200">
            <ul className="py-2">
              {specifications.map((category) => (
                <li 
                  key={category.category}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center ${
                    activeCategory === category.category 
                      ? 'border-l-4 border-red-600 font-medium' 
                      : ''
                  }`}
                  onClick={() => setActiveCategory(category.category)}
                >
                  <span className={activeCategory === category.category ? 'text-red-600' : ''}>
                    {category.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Specification details */}
          <div className="flex-1 p-6">
            <h3 className="text-xl font-medium mb-4">{activeCategory}</h3>
            
            {/* Fallback to display raw data if no specs are parsed */}
            {activeSpecs.length === 0 ? (
              <div className="text-red-500">No specifications found for this category</div>
            ) : (
              <div className="w-full">
                {activeSpecs.flatMap((spec, specIndex) => {
                  // Extract individual specs from the rich text bullet points
                  const extractedSpecs = extractSpecsFromRichText(spec.value);
                  
                  if (extractedSpecs.length === 0) {
                    return (
                      <div 
                        key={`spec-${specIndex}`}
                        className={`grid grid-cols-2 gap-4 ${specIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                      >
                        <div className="p-3 font-medium">{spec.name}</div>
                        <div className="p-3">
                          {typeof spec.value === 'string' 
                            ? spec.value 
                            : 'Complex value - see console for details'}
                        </div>
                      </div>
                    );
                  }
                  
                  return extractedSpecs.map((item, rowIndex) => (
                    <div 
                      key={`${specIndex}-${rowIndex}`}
                      className={`grid grid-cols-2 gap-4 ${
                        (specIndex + rowIndex) % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <div className="p-3 font-medium">{item.name}</div>
                      <div className="p-3">{item.value}</div>
                    </div>
                  ));
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-4 italic">
        *Product performance is based on testing in a controlled environment. Your results may vary due to several external and environmental factors.
      </p>
    </div>
  );
}