// document.addEventListener('DOMContentLoaded', function() {
//     fetch('maires.json')
//         .then(response => response.json())
//         .then(data => {
//             const timeline = document.getElementById('timeline');
//             data.forEach(maire => {
//                 const item = document.createElement('div');
//                 item.className = 'timeline-item';
//                 item.setAttribute('data-year', maire.years.split(' - ')[0]);
//                 item.setAttribute('data-commune', maire.commune);
//                 item.setAttribute('data-info', maire.info);
//                 item.setAttribute('data-sources', JSON.stringify(maire.sources));

//                 const h2 = document.createElement('h2');
//                 h2.textContent = maire.name;

//                 const p = document.createElement('p');
//                 p.textContent = maire.years;

//                 item.appendChild(h2);
//                 item.appendChild(p);

//                 timeline.appendChild(item);
//             });

//             // Sélectionner les éléments de la timeline après leur création
//             const timelineItems = document.querySelectorAll('.timeline-item');

//             const modal = document.getElementById('modal');
//             const modalTitle = document.getElementById('modal-title');
//             const modalInfo = document.getElementById('modal-info');
//             const modalSources = document.getElementById('modal-sources');
//             const closeButton = document.querySelector('.close-button');

//             timelineItems.forEach(item => {
//                 const year = item.getAttribute('data-year');
//                 const commune = item.getAttribute('data-commune');
//                 const info = item.getAttribute('data-info');
//                 const sources = JSON.parse(item.getAttribute('data-sources'));
//                 item.style.order = year;
//                 if (commune === 'Trévenans') {
//                     item.style.backgroundColor = '#e0f7fa';
//                 } else if (commune === 'Trétudans') {
//                     item.style.backgroundColor = '#ffecb3';
//                 } else if (commune === 'Vourvenans') {
//                     item.style.backgroundColor = '#c8e6c9';
//                 }

//                 item.addEventListener('click', function() {
//                     modalTitle.textContent = item.querySelector('h2').textContent;
//                     modalInfo.textContent = info;
//                     modalSources.innerHTML = sources.map(source => `<a href="${source.url}" target="_blank">${source.name}</a>`).join('<br>');
//                     modal.style.display = 'block';
//                 });
//             });

//             closeButton.addEventListener('click', function() {
//                 modal.style.display = 'none';
//             });
        
//             window.addEventListener('click', function(event) {
//                 if (event.target == modal) {
//                     modal.style.display = 'none';
//                 }
//             });
//         })
//         .catch(error => console.error('Error loading JSON:', error));
// });

document.addEventListener('DOMContentLoaded', function() {
    fetch('maires.json')
        .then(response => response.json())
        .then(data => {
            const timeline = document.getElementById('timeline');
            
            // Créer les colonnes
            const leftColumn = document.createElement('div');
            leftColumn.className = 'timeline-column left';
            
            const rightColumn = document.createElement('div');
            rightColumn.className = 'timeline-column right';

            const trevenansItems = document.createElement('div');
            trevenansItems.className = 'trevenans-items';
            
            // Séparer les maires par commune
            const mairesTretudans = data.filter(m => m.commune === 'Trétudans')
                .sort((a, b) => parseInt(b.years.split(' - ')[0]) - parseInt(a.years.split(' - ')[0]));
            
            const mairesVourvenans = data.filter(m => m.commune === 'Vourvenans')
                .sort((a, b) => parseInt(b.years.split(' - ')[0]) - parseInt(a.years.split(' - ')[0]));
            
            const mairesTrevenans = data.filter(m => m.commune === 'Trévenans')
                .sort((a, b) => parseInt(a.years.split(' - ')[0]) - parseInt(b.years.split(' - ')[0]));

            // Fonction pour créer un élément de timeline
            function createTimelineItem(maire) {
                const item = document.createElement('div');
                item.className = 'timeline-item';
                item.setAttribute('data-year', maire.years.split(' - ')[0]);
                item.setAttribute('data-commune', maire.commune);
                item.setAttribute('data-info', maire.info);
                item.setAttribute('data-sources', JSON.stringify(maire.sources));

                const h2 = document.createElement('h2');
                h2.textContent = maire.name;

                const p = document.createElement('p');
                p.textContent = maire.years;

                item.appendChild(h2);
                item.appendChild(p);

                // Appliquer la couleur de fond selon la commune
                if (maire.commune === 'Trévenans') {
                    item.style.backgroundColor = '#e0f7fa';
                } else if (maire.commune === 'Trétudans') {
                    item.style.backgroundColor = '#ffecb3';
                } else if (maire.commune === 'Vourvenans') {
                    item.style.backgroundColor = '#c8e6c9';
                }

                return item;
            }

            // Ajouter les maires à leurs colonnes respectives
            mairesTretudans.forEach(maire => {
                leftColumn.appendChild(createTimelineItem(maire));
            });

            mairesVourvenans.forEach(maire => {
                rightColumn.appendChild(createTimelineItem(maire));
            });

            mairesTrevenans.forEach(maire => {
                trevenansItems.appendChild(createTimelineItem(maire));
            });

            // Ajouter les colonnes à la timeline
            timeline.appendChild(leftColumn);
            timeline.appendChild(rightColumn);
            timeline.appendChild(trevenansItems);

            // Gérer les modales
            const timelineItems = document.querySelectorAll('.timeline-item');
            const modal = document.getElementById('modal');
            const modalTitle = document.getElementById('modal-title');
            const modalInfo = document.getElementById('modal-info');
            const modalSources = document.getElementById('modal-sources');
            const closeButton = document.querySelector('.close-button');

            timelineItems.forEach(item => {
                const info = item.getAttribute('data-info');
                const sources = JSON.parse(item.getAttribute('data-sources'));

                item.addEventListener('click', function() {
                    modalTitle.textContent = item.querySelector('h2').textContent;
                    modalInfo.textContent = info;
                    modalSources.innerHTML = sources.map(source => 
                        `<a href="${source.url}" target="_blank">${source.name}</a>`
                    ).join('<br>');
                    modal.style.display = 'block';
                });
            });

            closeButton.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        
            window.addEventListener('click', function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});