// @/utils/imageProcessor.js
import imageCompression from 'browser-image-compression';

/**
 * Opciones de compresión para diferentes tipos de contenido
 */
const compressionOptions = {
    // Para imágenes destacadas (1200x630px - Facebook/OpenGraph)
    featured: {
        maxSizeMB: 0.5, // 500KB
        maxWidthOrHeight: 800,
        useWebWorker: true,
        fileType: 'image/jpeg',
        initialQuality: 0.8
    },

    // Para imágenes en el contenido del artículo
    content: {
        maxSizeMB: 0.3, // 300KB
        maxWidthOrHeight: 600,
        useWebWorker: true,
        fileType: 'image/jpeg',
        initialQuality: 0.7
    },

    // Para miniaturas/thumbnails
    thumbnail: {
        maxSizeMB: 0.1, // 100KB
        maxWidthOrHeight: 400,
        useWebWorker: true,
        fileType: 'image/jpeg',
        initialQuality: 0.6
    }
};

/**
 * Procesa una imagen según el tipo especificado
 * @param {File} file - Archivo de imagen original
 * @param {string} type - Tipo de imagen: 'featured', 'content', 'thumbnail'
 * @returns {Promise<File>} - Archivo procesado
 */
export const processImage = async (file, type = 'content') => {
    try {
        const options = compressionOptions[type];

        console.log(`Procesando imagen: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);

        const compressedFile = await imageCompression(file, options);

        console.log(`Imagen comprimida: ${compressedFile.name} (${(compressedFile.size / 1024).toFixed(2)} KB)`);
        console.log(`Reducción: ${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`);

        return compressedFile;
    } catch (error) {
        console.error('Error procesando imagen:', error);
        throw new Error('No se pudo procesar la imagen');
    }
};

/**
 * Valida una imagen antes de procesarla
 * @param {File} file - Archivo de imagen
 * @returns {boolean} - True si es válida
 */
export const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
        throw new Error('Formato no soportado. Usa JPG, PNG o WebP');
    }

    if (file.size > maxSize) {
        throw new Error('La imagen es muy grande. Máximo 10MB');
    }

    return true;
};

/**
 * Convierte File a Base64 para vista previa
 * @param {File} file - Archivo de imagen
 * @returns {Promise<string>} - Data URL en base64
 */
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

/**
 * Dimensiones recomendadas para diferentes tipos
 */
export const recommendedDimensions = {
    featured: {
        width: 800,
        height: 630,
        aspectRatio: 1.91,
        description: 'Imagen destacada (Facebook/OpenGraph)'
    },
    content: {
        width: 600,
        height: 600,
        aspectRatio: 1.33,
        description: 'Imagen en contenido'
    },
    thumbnail: {
        width: 400,
        height: 300,
        aspectRatio: 1.33,
        description: 'Miniatura'
    }
};