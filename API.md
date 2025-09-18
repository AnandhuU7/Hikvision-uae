HIKVISION UAE - API ENDPOINTS CLASSIFICATION
==============================================

ENDPOINTS (Require Authentication & No Authentication Required)
===============================================================

1. /api/admin/login
   - POST: Public (No auth required) - Admin login
   - GET: Method not allowed (405)
   - PUT: Method not allowed (405)
   - DELETE: Method not allowed (405)
   - PATCH: Method not allowed (405)

2. /api/admin/dashboard-stats
   - GET: Admin auth required - Get dashboard statistics
   - POST: Admin auth required - Method not allowed (405)
   - PUT: Admin auth required - Method not allowed (405)
   - DELETE: Admin auth required - Method not allowed (405)
   - PATCH: Admin auth required - Method not allowed (405)

3. /api/admin/check-auth
   - GET: Admin auth required - Check authentication status
   - POST: Admin auth required - Method not allowed (405)
   - PUT: Admin auth required - Method not allowed (405)
   - DELETE: Admin auth required - Method not allowed (405)
   - PATCH: Admin auth required - Method not allowed (405)

4. /api/contacts
   - GET: Admin auth required - Get all contacts
   - POST: Public (No auth required) - Submit contact form
   - PUT: Admin auth required - Method not allowed (405)
   - DELETE: Admin auth required - Method not allowed (405)
   - PATCH: Admin auth required - Method not allowed (405)

5. /api/contacts/[id]
   - GET: Not implemented
   - POST: Not implemented
   - PUT: Admin auth required - Update contact
   - DELETE: Admin auth required - Delete contact
   - PATCH: Admin auth required - Update contact status

6. /api/upload
   - GET: Not implemented
   - POST: Admin auth required - Upload file to Cloudinary
   - PUT: Not implemented
   - DELETE: Not implemented
   - PATCH: Not implemented
   - OPTIONS: Public (No auth required) - CORS preflight

7. /api/auth/logout
   - GET: Method not allowed (405)
   - POST: Public (No auth required) - Logout user
   - PUT: Method not allowed (405)
   - DELETE: Method not allowed (405)
   - PATCH: Method not allowed (405)

8. /api/products
   - GET: Public (No auth required) - Get all products
   - POST: Auth required - Create product
   - PUT: Auth required - Method not allowed (405)
   - DELETE: Auth required - Method not allowed (405)
   - PATCH: Auth required - Method not allowed (405)

9. /api/products/[id]
   - GET: Public (No auth required) - Get product by ID
   - POST: Not implemented
   - PUT: Auth required - Update product
   - DELETE: Auth required - Delete product
   - PATCH: Not implemented

10. /api/products/slug/[slug]
    - GET: Public (No auth required) - Get product by slug
    - POST: Auth required - Method not allowed (405)
    - PUT: Auth required - Method not allowed (405)
    - DELETE: Auth required - Method not allowed (405)
    - PATCH: Auth required - Method not allowed (405)

11. /api/categories
    - GET: Public (No auth required) - Get all categories
    - POST: Auth required - Create category
    - PUT: Auth required - Method not allowed (405)
    - DELETE: Auth required - Method not allowed (405)
    - PATCH: Auth required - Method not allowed (405)

12. /api/categories/[id]
    - GET: Public (No auth required) - Get category by ID/slug
    - POST: Not implemented
    - PUT: Auth required - Update category
    - DELETE: Auth required - Delete category
    - PATCH: Not implemented

13. /api/categories/slug/[slug]
    - GET: Public (No auth required) - Get category by slug
    - POST: Auth required - Method not allowed (405)
    - PUT: Auth required - Method not allowed (405)
    - DELETE: Auth required - Method not allowed (405)
    - PATCH: Auth required - Method not allowed (405)

14. /api/subcategories
    - GET: Public (No auth required) - Get all subcategories
    - POST: Auth required - Create subcategory
    - PUT: Auth required - Method not allowed (405)
    - DELETE: Auth required - Method not allowed (405)
    - PATCH: Auth required - Method not allowed (405)

15. /api/subcategories/[id]
    - GET: Public (No auth required) - Get subcategory by ID/slug
    - POST: Not implemented
    - PUT: Auth required - Update subcategory
    - DELETE: Auth required - Delete subcategory
    - PATCH: Not implemented

16. /api/navbar-categories
    - GET: Public (No auth required) - Get all navbar categories
    - POST: Auth required - Create navbar category
    - PUT: Auth required - Method not allowed (405)
    - DELETE: Auth required - Method not allowed (405)
    - PATCH: Auth required - Method not allowed (405)

17. /api/navbar-categories/[id]
    - GET: Public (No auth required) - Get navbar category by ID/slug
    - POST: Not implemented
    - PUT: Auth required - Update navbar category
    - DELETE: Auth required - Delete navbar category
    - PATCH: Not implemented

18. /api/navbar-categories/slug/[slug]
    - GET: Public (No auth required) - Get navbar category by slug
    - POST: Auth required - Method not allowed (405)
    - PUT: Auth required - Method not allowed (405)
    - DELETE: Auth required - Method not allowed (405)
    - PATCH: Auth required - Method not allowed (405)

19. /api/files/[filename]
    - GET: Public (No auth required) - Serve uploaded files
    - POST: Auth required - Method not allowed (405)
    - PUT: Auth required - Method not allowed (405)
    - DELETE: Auth required - Method not allowed (405)
    - PATCH: Auth required - Method not allowed (405)

20. /api/sitemap
    - GET: Public (No auth required) - Generate sitemap XML
    - POST: Not implemented
    - PUT: Not implemented
    - DELETE: Not implemented
    - PATCH: Not implemented
    
    Configuration:
    - Route: dynamic = 'force-dynamic'
    - Revalidation: 3600 seconds (1 hour)
    - Cache: public, s-maxage=3600, stale-while-revalidate=86400
    - Content-Type: application/xml
    - CORS: Access-Control-Allow-Origin: *
    - Data Sources: /api/products, /api/categories, /api/subcategories, /api/navbar-categories
    - URL Structure: Static pages + Dynamic URLs from database
    - SEO: Includes changefreq and priority attributes

SUMMARY
=======

TOTAL ENDPOINTS: 20 main route groups

AUTHENTICATION TYPES:
- Public (No auth required): GET methods for data retrieval, POST for contact form, POST for login/logout
- Auth Required: POST, PUT, DELETE, PATCH methods for data manipulation
- Admin Auth Required: All admin routes, contact management, file uploads

ROUTE CONFIGURATIONS:
- Dynamic Routes: /api/sitemap (force-dynamic)
- Static Routes: Most other routes
- Caching: Various cache strategies implemented
- CORS: Configured for cross-origin requests

NOTES:
- All GET methods for data retrieval are public
- All data manipulation methods (POST, PUT, DELETE, PATCH) require authentication
- Admin-specific routes require admin authentication
- Contact form submission is public but contact management requires admin auth
- File uploads require admin authentication
- Sitemap generation is public for SEO purposes
- Upload route includes CORS preflight support
- All routes properly handle unsupported HTTP methods 