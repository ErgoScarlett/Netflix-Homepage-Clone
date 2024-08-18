document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.movie-row');
    
    carousels.forEach(function(row, index) {
       
        const container = row.querySelector('.row');
        const items = Array.from(container.querySelectorAll('.movie-card'));
        const prevButton = row.querySelector('.carousel-arrow.prev');
        const nextButton = row.querySelector('.carousel-arrow.next');
        
        if (!container || items.length === 0) {
            console.error('Container or items not found in:', row);
            return;
        }

        items.forEach(item => {
            const clonedItem = item.cloneNode(true);
            container.appendChild(clonedItem);
        });

        const cardWidth = items[0].offsetWidth;
        const totalItems = container.querySelectorAll('.movie-card').length;
        let currentIndex = 0;

        function updateCarousel() {
            container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
          
            if (prevButton) {
                prevButton.classList.toggle('d-none', currentIndex === 0);
            }
            if (nextButton) {
                nextButton.classList.toggle('d-none', currentIndex === totalItems - 1);
            }
        }

        function goToNext() {
            console.log(`Going to next item in carousel ${index + 1}`);


            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateCarousel();
            } else {
                container.style.transition = 'none'; 
                currentIndex = 0; 
                updateCarousel();
                setTimeout(() => {
                    container.style.transition = 'transform 0.5s ease';
                }, 50); 
            }
        }

        function goToPrev() {
            console.log(`Going to previous item in carousel ${index + 1}`);

            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            } else {
                container.style.transition = 'none'; 
                currentIndex = totalItems - 1; 
                updateCarousel();
                setTimeout(() => {
                    container.style.transition = 'transform 0.5s ease'; 
                }, 50); 
            }
        }

        if (nextButton) {
            nextButton.addEventListener('click', goToNext);
        }

        if (prevButton) {
            prevButton.addEventListener('click', goToPrev);
        }

        updateCarousel();
    });
});

