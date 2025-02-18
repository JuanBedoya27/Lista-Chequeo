function downloadPDF() {
    const element = document.getElementById('content');

    // Convertir los textarea en texto normal para evitar problemas con html2canvas
    document.querySelectorAll('.visible-textarea').forEach(textarea => {
        const textContent = textarea.value;  // Obtener el texto del textarea
        const div = document.createElement('div');  // Crear un div para mostrar el texto
        div.style.whiteSpace = 'pre-wrap';  // Asegurarnos de que los saltos de línea sean respetados
        div.textContent = textContent;  // Poner el contenido en el div
        textarea.replaceWith(div);  // Reemplazar el textarea con el div
    });

    const opt = {
        margin: [10, 10, 10, 10],
        filename: 'formulario.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            onclone: (documentClone) => {
                documentClone.querySelectorAll('.visible-textarea').forEach(textarea => {
                    const textContent = textarea.value;  
                    const div = document.createElement('div'); 
                    div.style.whiteSpace = 'pre-wrap';  
                    div.textContent = textContent;  
                    textarea.replaceWith(div);  
                });
            }
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            compress: true
        }
    };

    html2pdf().from(element)
        .set(opt)
        .toPdf()
        .get('pdf')
        .then(function(pdf) {
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(10);
                pdf.text('Página ' + i + ' de ' + totalPages, 190, 285);
            }
        })
        .save();
}
