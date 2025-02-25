document.addEventListener('DOMContentLoaded', () => {
    const bewerbungForm = document.getElementById('bewerbung-form');
    const bewerbungenTable = document.getElementById('bewerbungen-table').getElementsByTagName('tbody')[0];

    // Lade gespeicherte Bewerbungen aus LocalStorage
    const loadBewerbungen = () => {
        const bewerbungen = JSON.parse(localStorage.getItem('bewerbungen')) || [];
        bewerbungenTable.innerHTML = ''; // Leere die Tabelle
        bewerbungen.forEach((bewerbung, index) => {
            const row = bewerbungenTable.insertRow();
            
            // Statusfarbe ändern
            let statusColor = '';
            switch (bewerbung.status) {
                case 'Angebot erhalten':
                    statusColor = 'background-color: green; color: white;';
                    break;
                case 'Abgelehnt':
                    statusColor = 'background-color: red; color: white;';
                    break;
                case 'Beworben':
                    statusColor = 'background-color: green; color: white;';
                    break;
                default:
                    statusColor = '';
                    break;
            }

            row.innerHTML = `
                <td>${bewerbung.title}</td>
                <td>${bewerbung.company}</td>
                <td>${bewerbung.date}</td>
                <td style="${statusColor}">${bewerbung.status}</td>
                <td>${bewerbung.comment}</td>
                <td>${bewerbung.lastUpdated}</td>
                <td>
                    <button onclick="editBewerbung(${index})">Bearbeiten</button>
                    <button onclick="deleteBewerbung(${index})">Löschen</button>
                </td>
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

    // Bewerbungen bearbeiten
    window.editBewerbung = (index) => {
        const bewerbungen = JSON.parse(localStorage.getItem('bewerbungen'));
        const bewerbung = bewerbungen[index];

        document.getElementById('title').value = bewerbung.title;
        document.getElementById('company').value = bewerbung.company;
        document.getElementById('url').value = bewerbung.url;
        document.getElementById('date').value = bewerbung.date;
        document.getElementById('status').value = bewerbung.status;
        document.getElementById('comment').value = bewerbung.comment;

        // Bewerbungsdaten nach der Bearbeitung aktualisieren
        bewerbungForm.addEventListener('submit', function updateBewerbung(e) {
            e.preventDefault();

            bewerbung.title = document.getElementById('title').value;
            bewerbung.company = document.getElementById('company').value;
            bewerbung.url = document.getElementById('url').value;
            bewerbung.date = document.getElementById('date').value;
            bewerbung.status = document.getElementById('status').value;
            bewerbung.comment = document.getElementById('comment').value;
            bewerbung.lastUpdated = new Date().toLocaleString();

            // Speichern der aktualisierten Bewerbung
            bewerbungen[index] = bewerbung;
            localStorage.setItem('bewerbungen', JSON.stringify(bewerbungen));

            loadBewerbungen();
            bewerbungForm.reset();
        });
    };

    // Bewerbung löschen
    window.deleteBewerbung = (index) => {
        const bewerbungen = JSON.parse(localStorage.getItem('bewerbungen'));
        bewerbungen.splice(index, 1); // Entfernt das Element an der angegebenen Position
        localStorage.setItem('bewerbungen', JSON.stringify(bewerbungen));

        loadBewerbungen(); // Tabelle neu laden
    };

    // Lade alle Bewerbungen beim Laden der Seite
    loadBewerbungen();
});
