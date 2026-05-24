const fs = require('fs');
const path = require('path');

const eventSchedule = [
  {
    time: "10:00 AM",
    type: "talk",
    title: "The Future of AI in Software Development",
    speakers: ["Dr. Alex Smith"],
    categories: ["AI", "Software Engineering"],
    duration: "1 hour",
    description: "Explore how artificial intelligence is revolutionizing software creation, from automated code generation to intelligent debugging assistants."
  },
  {
    time: "11:00 AM",
    type: "transition",
    title: "Transition Break",
    duration: "10 minutes",
    description: "Time to grab a coffee and network."
  },
  {
    time: "11:10 AM",
    type: "talk",
    title: "Mastering Modern JavaScript Frameworks",
    speakers: ["Ms. Brenda Lee"],
    categories: ["Web Development", "JavaScript", "Frontend"],
    duration: "1 hour",
    description: "Dive deep into the latest features and best practices for popular JavaScript frameworks like React, Vue, and Angular."
  },
  {
    time: "12:10 PM",
    type: "transition",
    title: "Transition Break",
    duration: "10 minutes",
    description: "Time to grab a coffee and network."
  },
  {
    time: "12:20 PM",
    type: "talk",
    title: "Cloud Native Architectures with Kubernetes",
    speakers: ["Mr. Chris Green", "Dr. Dana White"],
    categories: ["DevOps", "Cloud Computing", "Kubernetes"],
    duration: "1 hour",
    description: "Learn how to design, deploy, and manage scalable applications using Kubernetes in a cloud-native environment."
  },
  {
    time: "01:20 PM",
    type: "break",
    title: "Lunch Break",
    duration: "1 hour",
    description: "Enjoy a delicious lunch and connect with fellow attendees."
  },
  {
    time: "02:20 PM",
    type: "transition",
    title: "Transition Break",
    duration: "10 minutes",
    description: "Time to grab a coffee and network."
  },
  {
    time: "02:30 PM",
    type: "talk",
    title: "Data Science for Beginners: From Zero to Hero",
    speakers: ["Dr. Eva Black"],
    categories: ["Data Science", "Python", "Analytics"],
    duration: "1 hour",
    description: "An introductory session to the world of data science, covering essential tools, techniques, and real-world applications."
  },
  {
    time: "03:30 PM",
    type: "transition",
    title: "Transition Break",
    duration: "10 minutes",
    description: "Time to grab a coffee and network."
  },
  {
    time: "03:40 PM",
    type: "talk",
    title: "Secure Coding Practices for Web Applications",
    speakers: ["Mr. Frank Blue"],
    categories: ["Cybersecurity", "Web Development"],
    duration: "1 hour",
    description: "Understand common web vulnerabilities and learn how to implement secure coding practices to protect your applications."
  },
  {
    time: "04:40 PM",
    type: "transition",
    title: "Transition Break",
    duration: "10 minutes",
    description: "Time to grab a coffee and network."
  },
  {
    time: "04:50 PM",
    type: "talk",
    title: "The Rise of Quantum Computing and Its Implications",
    speakers: ["Dr. Grace Red", "Prof. Henry Yellow"],
    categories: ["Quantum Computing", "Future Tech", "Physics"],
    duration: "1 hour",
    description: "An exciting look into the principles of quantum computing and its potential impact on various industries and scientific research."
  }
];

const css = `
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f4f7f6;
    color: #333;
    line-height: 1.6;
  }
  .container {
    max-width: 900px;
    margin: 20px auto;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  h1 {
    color: #0056b3;
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.5em;
  }
  .search-container {
    margin-bottom: 30px;
    text-align: center;
  }
  #categorySearch {
    width: 70%;
    padding: 12px 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1em;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
  }
  .schedule-item {
    display: flex;
    margin-bottom: 20px;
    background-color: #fdfdfd;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .schedule-item:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }
  .schedule-item.talk {
    border-left: 5px solid #007bff;
  }
  .schedule-item.break {
    border-left: 5px solid #28a745;
    background-color: #e6ffed;
  }
  .schedule-item.transition {
    border-left: 5px solid #ffc107;
    background-color: #fff9e6;
    color: #6a6a6a;
  }
  .time-col {
    flex: 0 0 120px;
    background-color: #0056b3;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.1em;
    padding: 15px;
    box-sizing: border-box;
  }
  .schedule-item.break .time-col {
    background-color: #218838;
  }
  .schedule-item.transition .time-col {
    background-color: #e0a800;
  }
  .details-col {
    flex-grow: 1;
    padding: 15px 20px;
  }
  .details-col h2 {
    margin-top: 0;
    color: #0056b3;
    font-size: 1.5em;
  }
  .schedule-item.break .details-col h2 {
    color: #218838;
  }
  .speakers, .duration {
    font-size: 0.9em;
    color: #555;
    margin-bottom: 5px;
  }
  .categories span {
    display: inline-block;
    background-color: #e0f2f7;
    color: #007bff;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8em;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .description {
    font-size: 0.95em;
    color: #444;
    margin-top: 10px;
  }
  .hidden {
    display: none !important;
  }
  footer {
    text-align: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    color: #777;
    font-size: 0.9em;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .schedule-item {
      flex-direction: column;
    }
    .time-col {
      flex: none;
      width: 100%;
      border-radius: 8px 8px 0 0;
      justify-content: flex-start;
    }
    .details-col {
      padding: 15px;
    }
    #categorySearch {
      width: 90%;
    }
    .container {
      padding: 20px;
      margin: 10px auto;
    }
  }
`;

// JavaScript content for the generated HTML
const js = `
  const scheduleData = ${JSON.stringify(eventSchedule, null, 2)};
  const scheduleContainer = document.getElementById('schedule');
  const categorySearchInput = document.getElementById('categorySearch');

  function renderSchedule(filterCategory = '') {
    scheduleContainer.innerHTML = ''; // Clear previous entries

    scheduleData.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('schedule-item', item.type);

      let shouldShow = true;
      if (filterCategory && item.type === 'talk') {
        const lowerCaseFilter = filterCategory.toLowerCase();
        shouldShow = item.categories.some(cat => cat.toLowerCase().includes(lowerCaseFilter));
      }

      if (!shouldShow) {
        itemElement.classList.add('hidden');
      }

      let detailsHtml = '';
      if (item.type === 'talk') {
        detailsHtml = '<h2>' + item.title + '</h2>' +
          '<p class="speakers"><strong>Speakers:</strong> ' + item.speakers.join(', ') + '</p>' +
          '<p class="duration"><strong>Duration:</strong> ' + item.duration + '</p>' +
          '<div class="categories">' +
            item.categories.map(cat => '<span>' + cat + '</span>').join('') +
          '</div>' +
          '<p class="description">' + item.description + '</p>';
      } else if (item.type === 'break' || item.type === 'transition') {
        detailsHtml = '<h2>' + item.title + '</h2>' +
          '<p class="duration"><strong>Duration:</strong> ' + item.duration + '</p>' +
          '<p class="description">' + item.description + '</p>';
      }

      itemElement.innerHTML = '<div class="time-col">' + item.time + '</div>' +
        '<div class="details-col">' + detailsHtml + '</div>';
      scheduleContainer.appendChild(itemElement);
    });
  }

  categorySearchInput.addEventListener('keyup', (event) => {
    renderSchedule(event.target.value);
  });

  // Initial render
  renderSchedule();
`;

// Combine all parts into a single HTML string
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Technical Talks Event Schedule</title>
    <style>
        ${css}
    </style>
</head>
<body>
    <div class="container">
        <h1>Technical Talks Event Schedule</h1>

        <div class="search-container">
            <input type="text" id="categorySearch" placeholder="Search by category (e.g., AI, Web Development)...">
        </div>

        <div id="schedule">
            <!-- Schedule items will be rendered here by JavaScript -->
        </div>

        <footer>
            <p>&copy; 2026 Technical Talks Event. All rights reserved.</p>
        </footer>
    </div>

    <script>
        ${js}
    </script>
</body>
</html>
`;

// Define the output path for the index.html file
const outputPath = path.join(process.cwd(), 'index.html');

// Write the combined HTML content to index.html
fs.writeFile(outputPath, htmlContent, (err) => {
  if (err) {
    console.error('Error writing index.html:', err);
  } else {
    console.log('Successfully generated index.html');
  }
});