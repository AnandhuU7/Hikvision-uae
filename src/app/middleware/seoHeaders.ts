
export function addSeoHeaders(res: Response, data: { seoTitle?: string; seoDescription?: string }) {
  if (data && data.seoTitle) {
    res.headers.set('X-SEO-Title', data.seoTitle);
  }
  if (data && data.seoDescription) {
    res.headers.set('X-SEO-Description', data.seoDescription);
  }
  // Add more SEO headers as needed
  
  return res;
}