const exportToPdf = (fields, objects) => {
    const printWindow = window.open('', 'PRINT', 'height=2600,width=2000')
    printWindow.document.write('<html>');
    printWindow.document.write('<head>');
    printWindow.document.write('<title>MED Pizzaria</title>');
    printWindow.document.write('</head>');
    printWindow.document.write('<body>');
    printWindow.document.write('<div style="margin-top:20px; display:flex; justify-content: center;">');
    printWindow.document.write('<table style="text-align: center; font-size: 18px; font-family: HelveticaNeue; border-collapse: collapse; display: table; border-spacing: 2px; border-color: grey;">');
    printWindow.document.write('<thead style="display: table-header-group; border-color: inherit; vertical-align: midle;">');
    printWindow.document.write('<tr style="display: table-row; border-color: inherit; vertical-align: inherit;">');
    fields.forEach(field => {
        printWindow.document.write('<th style="display: table-cell; font-weight: bold; vertical-align: inherit; text-align: -internal-center; border: 1px solid black;"><span>');
        printWindow.document.write(field.displayName || field);
        printWindow.document.write('</span></th>');
    })
    printWindow.document.write('</tr>');
    printWindow.document.write('</thead>')
    printWindow.document.write('<tbody style="display: table-row-group; vertical-align: middle; border-color: inherit;">');
    objects.forEach(object => {
        printWindow.document.write('<tr style="display: table-row; border-color: inherit; vertical-align: inherit;">');
        fields.forEach(field => {
            printWindow.document.write('<td style="border: 1px solid black; padding: 2px 10px;">' + (object.pessoa ? object.pessoa[field.name || field] : object[field.name || field]) + '</td>');
        })
    })
    printWindow.document.write('</tbody>');
    printWindow.document.write('</table>');
    printWindow.document.write('</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
};
export default exportToPdf;