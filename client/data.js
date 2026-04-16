const blogs = [
    {
        id: 1,
        slug: "learn-coding-beginners",
        title: "Learn Coding for Beginners",
        description: "Start your coding journey from scratch with this beginner guide.",
        image: "https://picsum.photos/seed/1/800/500",
        content: `<h2>Introduction</h2>
<p>Coding is one of the most valuable skills in today's world. It opens doors to high-paying jobs and freelancing opportunities.</p>
<h2>Why Learn Coding?</h2>
<p>Technology is growing rapidly. Learning coding helps you stay ahead in the digital era.</p>
<h2>Best Way to Start</h2>
<p>Begin with HTML, CSS, and JavaScript. Then move to frameworks.</p>
<h2>Conclusion</h2>
<p>Stay consistent and build projects to improve.</p>`
    },
    {
        id: 2,
        slug: "web-development-roadmap",
        title: "Web Development Roadmap 2026",
        description: "Complete roadmap to become a web developer.",
        image: "https://picsum.photos/seed/2/800/500",
        content: `<h2>Frontend</h2>
<p>Learn HTML, CSS, JavaScript, React.</p>
<h2>Backend</h2>
<p>Learn Node.js, databases, APIs.</p>
<h2>Projects</h2>
<p>Build real-world applications.</p>`
    },
    {
        id: 3,
        slug: "python-beginners",
        title: "Python for Beginners",
        description: "Learn Python easily with this guide.",
        image: "https://picsum.photos/seed/3/800/500",
        content: `<h2>Why Python?</h2>
<p>Python is simple and powerful.</p>
<h2>Applications</h2>
<p>Used in AI, web, automation.</p>`
    },
    {
        id: 4,
        slug: "javascript-complete-guide",
        title: "JavaScript Complete Guide",
        description: "Master JavaScript from basics to advanced concepts.",
        image: "https://picsum.photos/seed/4/800/500",
        content: `<h2>Introduction</h2>

<p>JavaScript powers the modern web and is essential for developers.</p>
<h2>Core Concepts</h2>
<p>Learn variables, functions, and DOM manipulation.</p>
<h2>Advanced Topics</h2>
<p>Explore async programming, APIs, and frameworks.</p>
<h2>Conclusion</h2>
<p>Practice consistently to master JavaScript.</p>`
    },
    {
        id: 5,
        slug: "frontend-developer-roadmap",
        title: "Frontend Developer Roadmap",
        description: "Step-by-step guide to becoming a frontend developer.",
        image: "https://picsum.photos/seed/5/800/500",
        content: `<h2>Start with Basics</h2>
<p>Learn HTML, CSS, and JavaScript.</p>
<h2>Frameworks</h2>
<p>Master React or Vue for modern apps.</p>
<h2>Projects</h2>
<p>Build real-world UI projects.</p>`
    },
    {
        id: 6,
        slug: "backend-development-guide",
        title: "Backend Development Guide",
        description: "Learn how servers and databases work.",
        image: "https://picsum.photos/seed/6/800/500",
        content: `<h2>Backend Basics</h2>
<p>Understand servers, APIs, and databases.</p>
<h2>Technologies</h2>
<p>Learn Node.js, Express, and MongoDB.</p>
<h2>Deployment</h2>
<p>Host your backend services online.</p>`
    },
    {
        id: 7,
        slug: "fullstack-developer-skills",
        title: "Full Stack Developer Skills",
        description: "Everything you need to become a full stack developer.",
        image: "https://picsum.photos/seed/7/800/500",
        content: `<h2>Frontend + Backend</h2>
<p>Master both client and server side.</p>
<h2>Database</h2>
<p>Work with SQL and NoSQL databases.</p>
<h2>Projects</h2>
<p>Build complete applications.</p>`
    },
    {
        id: 8,
        slug: "machine-learning-introduction",
        title: "Machine Learning Introduction",
        description: "Start your journey in machine learning.",
        image: "https://picsum.photos/seed/8/800/500",
        content: `<h2>What is ML?</h2>
<p>Machine learning allows systems to learn from data.</p>
<h2>Types</h2>
<p>Supervised and unsupervised learning.</p>
<h2>Tools</h2>
<p>Use Python and libraries like TensorFlow.</p>`
    },
    {
        id: 9,
        slug: "ai-for-beginners-guide",
        title: "AI for Beginners Guide",
        description: "Understand the basics of Artificial Intelligence.",
        image: "https://picsum.photos/seed/9/800/500",
        content: `<h2>Introduction</h2>
<p>AI is transforming industries worldwide.</p>
<h2>Applications</h2>
<p>Used in healthcare, finance, and automation.</p>
<h2>Getting Started</h2>
<p>Learn Python and ML basics.</p>`
    },
    {
        id: 10,
        slug: "git-github-guide",
        title: "Git and GitHub Guide",
        description: "Version control basics for developers.",
        image: "https://picsum.photos/seed/10/800/500",
        content: `<h2>Git Basics</h2>
<p>Track changes in your code.</p>
<h2>GitHub</h2>
<p>Host and collaborate on projects.</p>
<h2>Best Practices</h2>
<p>Use branches and commits effectively.</p>`
    },
    {
        id: 11,
        slug: "coding-interview-preparation",
        title: "Coding Interview Preparation",
        description: "Crack technical interviews with confidence.",
        image: "https://picsum.photos/seed/11/800/500",
        content: `<h2>DSA</h2>
<p>Focus on data structures and algorithms.</p>
<h2>Practice</h2>
<p>Solve problems daily.</p>
<h2>Mock Interviews</h2>
<p>Simulate real interview scenarios.</p>`
    },
    {
        id: 12,
        slug: "resume-tips-developers",
        title: "Resume Tips for Developers",
        description: "Build a strong tech resume.",
        image: "https://picsum.photos/seed/12/800/500",
        content: `<h2>Structure</h2>
<p>Keep it clean and professional.</p>
<h2>Projects</h2>
<p>Highlight your best work.</p>
<h2>Skills</h2>
<p>List relevant technologies.</p>`
    },
    {
        id: 13,
        slug: "best-coding-projects",
        title: "Best Coding Projects for Beginners",
        description: "Projects to boost your skills.",
        image: "https://picsum.photos/seed/13/800/500",
        content: `<h2>Start Small</h2>
<p>Build simple apps like calculators.</p>
<h2>Advance</h2>
<p>Create full-stack applications.</p>
<h2>Portfolio</h2>
<p>Showcase your work online.</p>`
    },
    {
        id: 14,
        slug: "cloud-computing-basics",
        title: "Cloud Computing Basics",
        description: "Introduction to cloud technologies.",
        image: "https://picsum.photos/seed/14/800/500",
        content: `<h2>What is Cloud?</h2>
<p>Storing and accessing data online.</p>
<h2>Providers</h2>
<p>AWS, Azure, Google Cloud.</p>
<h2>Benefits</h2>
<p>Scalability and flexibility.</p>`
    },
    {
        id: 15,
        slug: "devops-for-beginners",
        title: "DevOps for Beginners",
        description: "Learn DevOps fundamentals.",
        image: "https://picsum.photos/seed/15/800/500",
        content: `<h2>DevOps</h2>
<p>Combines development and operations.</p>
<h2>Tools</h2>
<p>Docker, Kubernetes, CI/CD.</p>
<h2>Automation</h2>
<p>Improve deployment efficiency.</p>`
    },
    {
        id: 16,
        slug: "debugging-techniques",
        title: "Debugging Techniques Guide",
        description: "Fix errors efficiently in your code.",
        image: "https://picsum.photos/seed/16/800/500",
        content: `<h2>Identify Bugs</h2>
<p>Understand error messages.</p>
<h2>Tools</h2>
<p>Use browser dev tools.</p>
<h2>Practice</h2>
<p>Debug regularly to improve.</p>`
    },
    {
        id: 17,
        slug: "system-design-basics",
        title: "System Design Basics",
        description: "Introduction to scalable systems.",
        image: "https://picsum.photos/seed/17/800/500",
        content: `<h2>Basics</h2>
<p>Learn scalability and architecture.</p>
<h2>Concepts</h2>
<p>Load balancing, caching.</p>
<h2>Examples</h2>
<p>Design real-world systems.</p>`
    },
    {
        id: 18,
        slug: "internship-guide-tech",
        title: "Internship Guide for Students",
        description: "How to get your first tech internship.",
        image: "https://picsum.photos/seed/18/800/500",
        content: `<h2>Preparation</h2>
<p>Build projects and skills.</p>
<h2>Applications</h2>
<p>Apply on LinkedIn and job portals.</p>
<h2>Interviews</h2>
<p>Prepare for technical rounds.</p>`
    },
    {
        id: 19,
        slug: "future-of-tech-careers",
        title: "Future of Tech Careers",
        description: "Explore upcoming tech trends.",
        image: "https://picsum.photos/seed/19/800/500",
        content: `<h2>Trends</h2>
<p>AI, blockchain, and cloud are growing.</p>
<h2>Opportunities</h2>
<p>High demand for skilled developers.</p>
<h2>Preparation</h2>
<p>Keep learning new technologies.</p>`
    },
    {
        id: 20,
        slug: "how-to-learn-programming-fast",
        title: "How to Learn Programming Fast",
        description: "Accelerate your coding journey.",
        image: "https://picsum.photos/seed/20/800/500",
        content: `<h2>Consistency</h2>
<p>Practice daily to improve.</p>
<h2>Projects</h2>
<p>Build real applications.</p>
<h2>Resources</h2>
<p>Use online platforms and tutorials.</p>`
    }

];
