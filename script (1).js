
        // JavaScript para efectos interactivos
        document.addEventListener('DOMContentLoaded', function() {
            // Animación de scroll suave
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            
            // Efecto de aparición para las tarjetas al hacer scroll
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Aplicar a las tarjetas de lugares
            const cards = document.querySelectorAll('.lugar-card');
            cards.forEach(card => {
                card.style.opacity = 0;
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(card);
            });
            
            // Efecto para el botón explorar
            const exploreBtn = document.querySelector('.hero .btn');
            exploreBtn.addEventListener('click', function() {
                document.querySelector('.lugares').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });


        document.addEventListener('DOMContentLoaded', function() {
            const carouselInner = document.querySelector('.carousel-inner');
            const indicators = document.querySelectorAll('.indicator');
            const prevButton = document.querySelector('.carousel-control.prev');
            const nextButton = document.querySelector('.carousel-control.next');
            
            let currentIndex = 0;
            let intervalId;
            
            // Función para actualizar el carrusel
            function updateCarousel() {
                carouselInner.style.transform = `translateX(-${currentIndex * 20}%)`;
                
                // Actualizar indicadores
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
            
            // Función para avanzar al siguiente slide
            function nextSlide() {
                currentIndex = (currentIndex + 1) % 5;
                updateCarousel();
            }
            
            // Iniciar el desplazamiento automático
            function startAutoSlide() {
                intervalId = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
            }
            
            // Detener el desplazamiento automático
            function stopAutoSlide() {
                clearInterval(intervalId);
            }
            
            // Event listeners para los controles
            nextButton.addEventListener('click', function() {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
            
            prevButton.addEventListener('click', function() {
                stopAutoSlide();
                currentIndex = (currentIndex - 1 + 5) % 5;
                updateCarousel();
                startAutoSlide();
            });
            
            // Event listeners para los indicadores
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    stopAutoSlide();
                    currentIndex = parseInt(this.getAttribute('data-index'));
                    updateCarousel();
                    startAutoSlide();
                });
            });
            
            // Pausar el carrusel cuando el ratón está sobre él
            const carousel = document.querySelector('.carousel');
            carousel.addEventListener('mouseenter', stopAutoSlide);
            carousel.addEventListener('mouseleave', startAutoSlide);
            
            // Iniciar el carrusel automático
            startAutoSlide();
        });

         function performSearch() {
            const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
            
            if (searchTerm === '') {
                alert('Por favor, ingresa un término de búsqueda');
                return;
            }
            
            // Buscar en las secciones de la página
            const sections = document.querySelectorAll('.section');
            let found = false;
            
            sections.forEach(section => {
                const content = section.textContent.toLowerCase();
                if (content.includes(searchTerm)) {
                    found = true;
                    // Desplazarse a la sección encontrada
                    section.scrollIntoView({ behavior: 'smooth' });
                    // Destacar la sección
                    section.style.backgroundColor = '#fff8e1';
                    setTimeout(() => {
                        section.style.backgroundColor = 'white';
                    }, 2000);
                }
            });
            
            if (!found) {
                alert('No se encontraron resultados para: ' + searchTerm);
            }
        }
        
        // Permitir búsqueda con la tecla Enter
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
 