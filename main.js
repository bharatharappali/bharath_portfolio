// function copyEmailAndOpen() {
//   const email = "bharatharappali@gmail.com";
//   navigator.clipboard.writeText(email).then(() => {
//     window.location.href = `mailto:${email}`;
//     // Display the copy message
//     const messageElement = document.getElementById("copy-message");
//     messageElement.style.display = "block";
//     // Hide the message after 2 seconds
//     setTimeout(() => {
//       messageElement.style.display = "none";
//     }, 2000);
//   }).catch((err) => console.error("Failed to copy email:", err));
// }


function copyEmailAndOpen() {
  const email = "bharatharappali@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const messageElement = document.getElementById("copy-message");
    messageElement.style.display = "block";
    setTimeout(() => {
      messageElement.style.display = "none";
    }, 2000);
  }).catch((err) => console.error("Failed to copy email:", err));
}
document.addEventListener("DOMContentLoaded", function () {
  const bioSection = document.getElementById("bioSection");
  const workSection = document.getElementById("work");

  function toggleBioSection() {
    if (window.innerWidth > 576) {
      bioSection.style.display = "none";
    }
  }

  // Run on initial load
  toggleBioSection();

  // Run on window resize
  window.addEventListener("resize", toggleBioSection);
});


document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = this.getAttribute('data-target');

      if (target) {
        e.preventDefault();

        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));

        const targetSection = document.querySelector(target);

        if (targetSection) {
          targetSection.classList.add('active');
        } else {
          console.error('Target section not found:', target);
        }

        document.querySelectorAll('.nav-link').forEach(navLink => navLink.classList.remove('active'));

        this.classList.add('active');
      }
    });
  });
})

// document.addEventListener("DOMContentLoaded", function() {
//   fetch('experiment.json')
//   .then(response => response.json())
//   .then(data => {
//     const exp = document.getElementById('expSection');
//     const columns = document.querySelectorAll('.column');

//     const textSection = document.createElement('div');
//     textSection.className = 'text-section align-items-center mb-3 pb-2';
//     textSection.textContent = 'An ensemble of my best works, fuck-up\'s, explorations, WIPs and more...';

//     exp.insertBefore(textSection, exp.firstChild);
    
//     data.forEach((item, index) => {
//       if (item.type === 'image') {
//               const img = document.createElement('img');
//               img.src = item.url;
//               img.alt = item.alt;

//               const columnIndex = index % columns.length;
//               columns[columnIndex].appendChild(img);
//           } else if (item.type === 'video') {
//               const video = document.createElement('video');
//               video.src = item.url;
//               video.controls = true;
//               video.loop = true;
//               video.autoplay = true;
//               video.setAttribute('preload', 'auto'); 
//               video.setAttribute('playsinline', ''); 
//               video.setAttribute('webkit-playsinline', '');
//               // video.setAttribute('loop', '');

//               const columnIndex = index % columns.length;
//               columns[columnIndex].appendChild(video);
//           }
//       });
      
//   })
//   .catch(error => console.error('Error fetching data:', error));
// });
document.addEventListener("DOMContentLoaded", function() {
  fetch('experiment.json')
  .then(response => response.json())
  .then(data => {
    const exp = document.getElementById('expSection');
    const columns = document.querySelectorAll('.column');
    const lightbox = document.getElementById('lightbox');
    const lightboxMedia = document.getElementById('lightboxMedia');
    const lightboxFooter = document.getElementById('lightboxFooter');
    const prevButton = document.querySelector('.lightbox .prev');
    const nextButton = document.querySelector('.lightbox .next');
    const closeButton = document.getElementById('closeButton');

    let currentIndex = 0;

    const textSection = document.createElement('div');
    textSection.className = 'text-section align-items-center mb-3 pb-2';
    textSection.textContent = 'An ensemble of my best works, explorations, WIPs and more...';

    exp.insertBefore(textSection, exp.firstChild);
    
    data.forEach((item, index) => {
      let mediaElement;
      if (item.type === 'image') {
        mediaElement = document.createElement('img');
        mediaElement.src = item.url;
        mediaElement.alt = item.alt;
      } else if (item.type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.src = item.url;
        mediaElement.controls = true;
        mediaElement.loop = true;
        mediaElement.autoplay = true;
        mediaElement.setAttribute('preload', 'auto');
        mediaElement.setAttribute('playsinline', '');
        mediaElement.setAttribute('webkit-playsinline', '');
      }
      
      const columnIndex = index % columns.length;
      columns[columnIndex].appendChild(mediaElement);

      // Add click event to open lightbox
      mediaElement.addEventListener('click', () => {
        openLightbox(index);
      });
    });

    function openLightbox(index) {
      currentIndex = index;
      const item = data[currentIndex];
      lightboxMedia.innerHTML = ''; 

      let mediaElement;
      if (item.type === 'image') {
        mediaElement = document.createElement('img');
        mediaElement.src = item.url;
        mediaElement.alt = item.alt;
      } else if (item.type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.src = item.url;
        mediaElement.controls = true;
        mediaElement.loop = true;
        mediaElement.autoplay = true;
      }

      lightboxMedia.appendChild(mediaElement);
      lightboxFooter.textContent = `Item ${currentIndex + 1} of ${data.length}`;
      lightbox.classList.add('show');
    }

    function navigateLightbox(direction) {
      currentIndex = (currentIndex + direction + data.length) % data.length;
      openLightbox(currentIndex);
    }

    function closeLightbox() {
      lightbox.classList.remove('show');
    }

    prevButton.addEventListener('click', () => navigateLightbox(-1));
    nextButton.addEventListener('click', () => navigateLightbox(1));
    closeButton.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      // Close lightbox on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
      });
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('show');
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));
});


function toggleDescription(event) {
  const target = event.target;
  if (target.classList.contains('read-more')) {
    const descriptionP = target.parentNode.querySelector('.description');
    const fullDescription = descriptionP.dataset.fullDescription;
    descriptionP.textContent = fullDescription;
    target.style.display = 'none';
    descriptionP.parentNode.querySelector('.read-less').style.display = 'inline-block';
  } else if (target.classList.contains('read-less')) {
    const descriptionP = target.parentNode.querySelector('.description');
    const shortDescription = descriptionP.dataset.shortDescription;
    descriptionP.textContent = shortDescription;
    target.style.display = 'none';
    descriptionP.parentNode.querySelector('.read-more').style.display = 'inline-block';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('work.json')
      .then(response => response.json())
      .then(data => {
          const workSection = document.getElementById('work');

          // Filter Section

          const filterPrefix = document.createElement('span');
          filterPrefix.className = 'filter-prefix fw-bold me-2';
          filterPrefix.textContent = 'Filter:';
          
          const filterSection = document.createElement('div');
          filterSection.appendChild(filterPrefix);
          filterSection.className = 'filter-section d-flex align-items-center mb-3 pb-2';
          const allChip = document.createElement('button');
          allChip.className = 'btn btn-outline-transparent btn-sm me-2 filter-chip active';
          allChip.textContent = 'All';
          allChip.dataset.filter = 'all';
          filterSection.appendChild(allChip);

          const typeCounts = data.projects.reduce((acc, project) => {
              acc[project.projectType] = (acc[project.projectType] || 0) + 1;
              return acc;
          }, {});

          for (const [type, count] of Object.entries(typeCounts)) {
              const chip = document.createElement('button');
              chip.className = 'btn btn-outline-transparent btn-sm me-2 filter-chip';
              chip.innerHTML = `${type} <sup>[${count}]</sup>`;
              chip.dataset.filter = type;
              filterSection.appendChild(chip);
          }

          workSection.appendChild(filterSection);

          // Projects Section

          const renderProjects = (filter) => {
            workSection.querySelectorAll('.project').forEach((el) => el.remove());
          
            data.projects
              .filter((project) => filter === 'all' || project.projectType === filter)
              .forEach((project, projectIndex) => {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project d-flex gap-1 flex-column';

                if (projectIndex === 0) {
                  const adjustMarginTop = () => {
                    if (window.innerWidth <= 768) {
                      projectDiv.style.marginTop = '90px'; 
                    } else {
                      projectDiv.style.marginTop = '80px';
                    }
                  };
                
                  // Call the function initially
                  adjustMarginTop();
                
                  // Add event listener to handle screen resizing
                  window.addEventListener('resize', adjustMarginTop);
                }
                projectDiv.style.borderBottom = '1px solid black'; 
                projectDiv.style.paddingBottom = '6px'; 
                projectDiv.style.marginBottom = '20px'; 
          
                // Carousel
                // const carouselId = `carouselExampleIndicators-${projectIndex}`;
                // const carouselDiv = document.createElement('div');
                // carouselDiv.className = 'carousel slide carousel-fade col-12';
                // carouselDiv.id = carouselId;
                // carouselDiv.setAttribute('data-bs-ride', 'carousel');
          
                // const indicatorsDiv = document.createElement('div');
                // indicatorsDiv.className = 'carousel-indicators';
                // carouselDiv.appendChild(indicatorsDiv);
          
                // const innerDiv = document.createElement('div');
                // innerDiv.className = 'carousel-inner';
                // carouselDiv.appendChild(innerDiv);
          
                // const prevButton = document.createElement('button');
                // prevButton.className = 'carousel-control-prev';
                // prevButton.type = 'button';
                // prevButton.setAttribute('data-bs-target', `#${carouselId}`);
                // prevButton.setAttribute('data-bs-slide', 'prev');
                // prevButton.innerHTML = `
                //   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                //   <span class="visually-hidden">Previous</span>`;
                // carouselDiv.appendChild(prevButton);
          
                // const nextButton = document.createElement('button');
                // nextButton.className = 'carousel-control-next';
                // nextButton.type = 'button';
                // nextButton.setAttribute('data-bs-target', `#${carouselId}`);
                // nextButton.setAttribute('data-bs-slide', 'next');
                // nextButton.innerHTML = `
                //   <span class="carousel-control-next-icon" aria-hidden="true"></span>
                //   <span class="visually-hidden">Next</span>`;
                // carouselDiv.appendChild(nextButton);
          
                // projectDiv.appendChild(carouselDiv);
          
                // // Adding slides to carousel
                // project.carousel.forEach((item, index) => {
                //   const carouselItem = document.createElement('div');
                //   carouselItem.className = 'carousel-item' + (index === 0 ? ' active' : '');
                //   carouselItem.style.transition = 'opacity 0.5s ease-in-out';
          
                //   if (item.type === 'image') {
                //     const img = document.createElement('img');
                //     img.src = item.url;
                //     img.alt = item.alt;
                //     img.className = 'd-block w-100';
                //     carouselItem.appendChild(img);
                //   } else if (item.type === 'video') {
                //     const video = document.createElement('video');
                //     video.controls = true;
                //     video.loop = true;
                //     video.autoplay = true;
                //     video.setAttribute('playsinline', '');
                //     video.setAttribute('webkit-playsinline', '');
                //     video.className = 'd-block w-100';
          
                //     const sourceMp4 = document.createElement('source');
                //     sourceMp4.src = item.url;
                //     video.appendChild(sourceMp4);
          
                //     const fallbackText = document.createTextNode('Your browser does not support the video tag.');
                //     video.appendChild(fallbackText);
          
                //     carouselItem.appendChild(video);
                //   }
          
                //   innerDiv.appendChild(carouselItem);
          
                //   const indicatorButton = document.createElement('button');
                //   indicatorButton.type = 'button';
                //   indicatorButton.setAttribute('data-bs-target', `#${carouselId}`);
                //   indicatorButton.setAttribute('data-bs-slide-to', index);
                //   if (index === 0) indicatorButton.className = 'active';
                //   indicatorButton.setAttribute('aria-current', 'true');
                //   indicatorButton.setAttribute('aria-label', `Slide ${index + 1}`);
                //   indicatorsDiv.appendChild(indicatorButton);
                // });

                // Create the scrollable container
const scrollContainer = document.createElement('div');
scrollContainer.className = 'scroll-container';

// Add items to the scrollable container
project.carousel.forEach((item) => {
  const scrollItem = document.createElement('div');
  scrollItem.className = 'scroll-item';

  if (item.type === 'image') {
    const img = document.createElement('img');
    img.src = item.url;
    img.alt = item.alt;
    img.style.width = '100%';
    img.style.height = 'auto';
    scrollItem.appendChild(img);
  } else if (item.type === 'video') {
    const video = document.createElement('video');
    video.controls = true;
    video.loop = true;
    video.autoplay = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const sourceMp4 = document.createElement('source');
    sourceMp4.src = item.url;
    video.appendChild(sourceMp4);

    const fallbackText = document.createTextNode('Your browser does not support the video tag.');
    video.appendChild(fallbackText);

    scrollItem.appendChild(video);
  }

  scrollContainer.appendChild(scrollItem);
});

// Append the scrollable container to the parent element
projectDiv.appendChild(scrollContainer);

scrollContainer.scrollTo({
  left: 0,
  behavior: 'smooth'
});
          
                // Project Details
                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'project-details row mt-3';
          
                const titleInfoDiv = document.createElement('div');
                titleInfoDiv.className = 'title-info col-md-3 col-sm-12';
                titleInfoDiv.innerHTML = `<p class="title" style="font-weight: bold;"><strong>${project.title}</strong></p>`;
                detailsDiv.appendChild(titleInfoDiv);
          
                const projectInfoDiv = document.createElement('div');
                projectInfoDiv.className = 'project-info col-md-9 col-sm-12';
                projectInfoDiv.innerHTML = `<p class="sub-title">${project.subTitle}</p>`;
          
                // Expandable Details
                const moreInfoButton = document.createElement('button');
                moreInfoButton.className = 'btn mt-2';
                moreInfoButton.innerHTML = 'More Info <span style="font-size: 8px;">▼</span>';
                moreInfoButton.style.border = 'none';
                moreInfoButton.style.background = 'none'; 
                moreInfoButton.style.color = 'black';
                moreInfoButton.style.cursor = 'pointer';
          
                const expandableDiv = document.createElement('div');
                expandableDiv.className = 'expandable-info row mt-3';
                expandableDiv.style.display = 'none';
                expandableDiv.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';
                expandableDiv.style.overflow = 'hidden';
          
                const descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'description-info col-md-6';
                descriptionDiv.innerHTML = `<p>${project.description}</p>`;
          
                const additionalInfoDiv = document.createElement('div');
                additionalInfoDiv.className = 'additional-info col-md-6';
                additionalInfoDiv.innerHTML = `
                  <p class="project-type" style="font-weight: bold;">[Type: ${project.projectType}]</p>
                  <p class="collab" style="font-weight: bold;">[Collaboration: ${project.collab}]</p>
                  <p class="client-status" style="font-weight: bold;">[Status: ${project.clientStatus}]</p>
                `;
          
                expandableDiv.appendChild(descriptionDiv);
                expandableDiv.appendChild(additionalInfoDiv);
          
                const showLessButton = document.createElement('button');
                showLessButton.className = 'btn mt-2';
                showLessButton.innerHTML = 'Show Less <span style="font-size: 8px;">▲</span>';
                showLessButton.style.border = 'none'; 
                showLessButton.style.background = 'none'; 
                showLessButton.style.color = 'black';
                showLessButton.style.cursor = 'pointer';
                showLessButton.style.display = 'none';
          
                moreInfoButton.addEventListener('click', () => {
                  expandableDiv.style.display = 'flex';
                  moreInfoButton.style.display = 'none';
                  showLessButton.style.display = 'block';
                });
          
                showLessButton.addEventListener('click', () => {
                  expandableDiv.style.display = 'none';
                  moreInfoButton.style.display = 'block';
                  showLessButton.style.display = 'none';
                });
          
                projectInfoDiv.appendChild(moreInfoButton);
                projectInfoDiv.appendChild(expandableDiv);
                projectInfoDiv.appendChild(showLessButton);
          
                detailsDiv.appendChild(projectInfoDiv);
          
                projectDiv.appendChild(detailsDiv);
                workSection.appendChild(projectDiv);
              });
          };
          
          
          

          renderProjects('all');

          // Add event listeners to filter chips
          filterSection.addEventListener('click', (e) => {
              if (e.target.classList.contains('filter-chip')) {
                  filterSection.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
                  e.target.classList.add('active');
                  renderProjects(e.target.dataset.filter);
              }
          });
      })
      .catch(error => console.error('Error fetching projects data:', error));
});




// Define currentIndex at the beginning of your script
let currentIndex = 0;

function changeColors() {
  // Load the JSON file
  fetch('color-palette.json')
    .then(response => response.json())
    .then(colorData => {
      // get the current color scheme
      const currentColor = colorData.colors[currentIndex];
      console.log('Current Color Scheme:', currentColor); 

      // apply the color scheme to the website
      document.body.style.backgroundColor = currentColor['bg-color'];
      document.body.style.color = currentColor['body-color'];

      // apply the color scheme to the buttons
      const tabButtons = document.querySelectorAll('.navbar');
      const navLinks = document.querySelectorAll('.nav-link');
      const navLink = document.querySelectorAll('.link');
      const filterSection = document.querySelectorAll('.filter-section');
      const textSection = document.querySelectorAll('.text-section');
      tabButtons.forEach(a => {
        a.style.backgroundColor = currentColor['bg-color'];
        a.style.color = currentColor['body-color'];
        console.log('Updated tab button color:', a.style.color);
        // a.offsetHeight;
      });
      navLinks.forEach(a => {
        // a.style.backgroundColor = currentColor['bg-color'];
        a.style.color = currentColor['body-color'];
        console.log('Updated tab button color:', a.style.color);
        a.offsetHeight;
      });
      navLink.forEach(a => {
        // a.style.backgroundColor = currentColor['bg-color'];
        a.style.color = currentColor['body-color'];
        console.log('Updated tab button color:', a.style.color);
        a.offsetHeight;
      });
      filterSection.forEach(a => {
        a.style.backgroundColor = currentColor['bg-color'];
        a.style.color = currentColor['body-color'];
        console.log('Updated tab button color:', a.style.color);
        a.offsetHeight;
      });
      textSection.forEach(a => {
        a.style.backgroundColor = currentColor['bg-color'];
        a.style.color = currentColor['body-color'];
        console.log('Updated tab button color:', a.style.color);
        a.offsetHeight;
      });

      // increment the current index
      currentIndex = (currentIndex + 1) % colorData.colors.length;
    })
    .catch(error => {
      console.error('Error loading color data:', error);
    });
}


const colorChangerButton = document.getElementById('color-changer-button');
colorChangerButton.addEventListener('click', function (event) {
  event.preventDefault();
  changeColors();
});
