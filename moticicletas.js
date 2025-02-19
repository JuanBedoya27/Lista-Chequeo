function downloadPDF() {
    const element = document.getElementById('content');
    if (!element) {
      console.error("No se encontró el elemento con id 'content'.");
      return;
    }
    
    html2pdf().set({
      margin: [5, 5, 5, 5], // Márgenes en mm (top, right, bottom, left)
      filename: 'lista_chequeo.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, // Aumenta la escala para mejor resolución
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        onclone: function(documentClone) {
          // Forzamos estilos en el clon para que las tablas se muestren correctamente
          const cloneContent = documentClone.getElementById('content');
          if (cloneContent) {
            cloneContent.style.display = 'block';
            // Ajustamos todas las tablas dentro del contenido
            const tables = cloneContent.querySelectorAll('table');
            tables.forEach(table => {
              table.style.tableLayout = 'fixed';
              table.style.width = '100%';
              table.style.borderCollapse = 'collapse';
              // Puedes ajustar el font-size si es necesario
              table.style.fontSize = '10px';
            });
          }
        }
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'landscape' // Cambia a landscape para mayor ancho
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    })
    .from(element)
    .save();
  }
  