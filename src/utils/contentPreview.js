// @/utils/contentPreview.js

/**
 * Genera una vista previa HTML de un artículo/noticia
 * @param {Object} content - Objeto con los datos del contenido
 * @param {string} content.title - Título del contenido
 * @param {string} content.excerpt - Descripción corta
 * @param {string} content.content - Contenido HTML completo
 * @param {string} content.featuredImage - URL de la imagen destacada
 * @param {string} content.author - Autor del contenido
 * @param {string} content.category - Categoría del contenido
 * @param {string} content.type - Tipo de contenido (article/news)
 */
export const generateContentPreview = (content) => {
  const { title, excerpt, content: htmlContent, featuredImage, author, category } = content
  
  if (!htmlContent?.trim()) {
    alert('No hay contenido para previsualizar.')
    return false
  }

  const previewWindow = window.open('', '_blank')
  const previewHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vista Previa: ${title || 'Sin título'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            line-height: 1.6;
          }
          img { 
            max-width: 100%; 
            height: auto; 
          }
        </style>
      </head>
      <body>
        <h1>${title || 'Sin título'}</h1>
        ${featuredImage ? `<img src="${featuredImage}" alt="Imagen destacada">` : ''}
        <p><em>${excerpt || 'Sin descripción'}</em></p>
        <p><strong>Por: ${author || 'Anónimo'}</strong></p>
        ${category ? `<p><strong>Categoría:</strong> ${getCategoryText(category)}</p>` : ''}
        <div>${htmlContent}</div>
      </body>
    </html>
  `

  previewWindow.document.write(previewHTML)
  previewWindow.document.close()
  return true
}

/**
 * Obtiene el texto legible de una categoría
 * @param {string} category - Slug de la categoría
 * @returns {string} Texto legible de la categoría
 */
const getCategoryText = (category) => {
  const categoryMap = {
    'agricultura': 'Agricultura',
    'tecnologia': 'Tecnología Agrícola',
    'sostenibilidad': 'Sostenibilidad',
    'mercados': 'Mercados',
    'consejos': 'Consejos Prácticos',
    'noticias': 'Noticias',
    'cultivos': 'Manejo de Cultivos',
    'suelos': 'Suelos y Fertilización',
    'ganaderia': 'Producción Animal',
    'agroindustria': 'Agroindustria'
  }
  return categoryMap[category] || category
}

/**
 * Valida si el contenido tiene suficiente información para previsualizar
 * @param {Object} content - Objeto con los datos del contenido
 * @returns {boolean} True si es válido para previsualizar
 */
export const validateContentForPreview = (content) => {
  if (!content.content?.trim()) {
    return false
  }
  return true
}