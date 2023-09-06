import { PdfSigner, SignatureInfo, SignatureSettings } from "sign-pdf-lib";
import * as fsPromises from 'fs/promises';

async function main() {
    try {
        const info: SignatureInfo = {
            pageNumber: 1,
            name: 'sergioDev',
            location: 'Medellin',
            reason: 'Signing Certificate',
            modified: new Date(),
            contactInfo: 'info@sergiodev.com',
            visual: {
                jpgImage: await fsPromises.readFile('signature.jpg'),
                imageRectangle: { left: 50.0, top: 180 - 100, right: 50.0 + 214.0, bottom: 180 - 100 + 70 }
            }
        };

        const settings: SignatureSettings = {
            signatureLength: 4000 - 6,
            rangePlaceHolder: 9999999,
            p12Certificate: await fsPromises.readFile('sergioDev.p12'),
            pemCertificate: await fsPromises.readFile('certSergioDev.pem', 'ascii'),
            pemKey: await fsPromises.readFile('KeySergioDev.pem', 'ascii'),
            certificatePassword: ''
        };

        const filePath = 'document.pdf'; // Cambia esto por la ruta de tu archivo
        const filePathVerify = 'doc-signed-video2.pdf';

        const pdfSigner = new PdfSigner(settings);

        const fileBytes = await fsPromises.readFile(filePath);

        const signedPdf = await pdfSigner.signAsync(fileBytes, info);

        await fsPromises.writeFile(filePathVerify, signedPdf);

        // Verificar firma
        const fileBytesVerify = await fsPromises.readFile(filePathVerify);
        const verifyPdf = await pdfSigner.verifySignaturesAsync(fileBytesVerify);

    } catch (error) {
        console.error('Error al leer el archivo:', error);
    }
}

main();
