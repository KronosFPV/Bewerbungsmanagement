document.addEventListener('DOMContentLoaded', () => {
    const bewerbungForm = document.getElementById('bewerbung-form');
    const bewerbungenTable = document.getElementById('bewerbungen-table').getElementsByTagName('tbody')[0];

    // Lade gespeicherte Bewerbungen aus LocalStorage
    const loadBewerbungen = () => {
        const bewerbungen = JSON.parse(localStorage.getItem('bewerbungen')) || [];
        bewerbungenTable.innerHTML = ''; // Leere die Tabelle
        bewerbungen.forEach(bewerbung => {
            const row = bewerbungenTable.insertRow();
            row.innerHTML = `
                <td>${bewerbung.title}</td>
                <td>${bewerbung.company}</td>
                <td>${bewerbung.date}</td>
                <td>${bewerbung.status}</td>
                <td>${bewerbung.comment}</td>
                <td>${bewerbung.lastUpdated}</td>
            `;
        });
    };

    // Speichern einer neuen Bewerbung
    bewerbungForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newBewerbung = {
            title: document.getElementById('title').value,
            company: document.getElementById('company').value,
            url: document.getElementById('url').value,
            date: document.getElementById('date').value,
            status: document.getElementById('status').value,
            comment: document.getElementById('comment').value,
            lastUpdated: new Date().toLocaleString()
        };

        const bewerbungen = JSON.parse(localStorage.getItem('bewerbungen')) || [];
        bewerbungen.push(newBewerbung);
        localStorage.setItem('bewerbungen', JSON.stringify(bewerbungen));

        loadBewerbungen();
        bewerbungForm.reset();
    });

    loadBewerbungen(); // Lade gespeicherte Bewerbungen beim Laden der Seite
});
