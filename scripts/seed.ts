import { client } from "../lib/sanity";

const seedData = {
  works: [
    {
      _type: "work",
      title: "E-commerce Platform Redesign",
      slug: {
        _type: "slug",
        current: "ecommerce-platform-redesign",
      },
      description:
        "Complete redesign and development of a modern e-commerce platform",
      core: {
        producerName: "Sarah Johnson",
        clientName: "Fashion Retail Co",
        projectTitle: "E-commerce Platform Redesign",
        projectCategory: "E-commerce",
        projectChallenge:
          "Modernizing an outdated e-commerce platform while maintaining existing customer base",
        projectTechStack: ["Next.js", "Shopify", "TailwindCSS", "TypeScript"],
      },
      brandDevelopment: {
        purpose: {
          title: "Digital Transformation",
          description:
            "Transform traditional retail into a modern digital shopping experience",
        },
        audience: {
          title: "Fashion-Forward Shoppers",
          description:
            "Style-conscious consumers aged 25-40 who value convenience and quality",
        },
        archetypes: [
          {
            title: "The Trendsetter",
            description: "Early adopters who influence fashion trends",
          },
          {
            title: "The Quality Seeker",
            description:
              "Customers who prioritize quality and brand reputation",
          },
        ],
      },
      webDesign: {
        designSystem: {
          title: "Modern E-commerce Design System",
          description:
            "Component-based design system optimized for shopping experience",
        },
      },
      webDevelopment: {
        features: [
          {
            title: "Smart Search",
            description:
              "AI-powered search with visual recognition capabilities",
          },
          {
            title: "Virtual Try-On",
            description: "AR-based virtual fitting room experience",
          },
        ],
      },
    },
    {
      _type: "work",
      title: "Healthcare Portal",
      slug: {
        _type: "slug",
        current: "healthcare-portal",
      },
      description: "Secure patient management system for healthcare providers",
      core: {
        producerName: "Michael Chen",
        clientName: "MedCare Solutions",
        projectTitle: "Healthcare Portal",
        projectCategory: "Healthcare",
        projectChallenge:
          "Creating a HIPAA-compliant portal with excellent user experience",
        projectTechStack: ["React", "Node.js", "PostgreSQL", "AWS"],
      },
      brandDevelopment: {
        purpose: {
          title: "Healthcare Accessibility",
          description:
            "Making healthcare management accessible and secure for everyone",
        },
        audience: {
          title: "Healthcare Providers",
          description:
            "Medical professionals and administrative staff in healthcare facilities",
        },
        archetypes: [
          {
            title: "The Caregiver",
            description: "Medical professionals focused on patient care",
          },
          {
            title: "The Administrator",
            description: "Healthcare administrators managing patient records",
          },
        ],
      },
      webDesign: {
        designSystem: {
          title: "Healthcare UX System",
          description:
            "Accessible and intuitive design system for healthcare applications",
        },
      },
      webDevelopment: {
        features: [
          {
            title: "Secure Authentication",
            description: "Multi-factor authentication with biometric support",
          },
          {
            title: "Real-time Updates",
            description:
              "Instant notifications and updates for critical patient data",
          },
        ],
      },
    },
    {
      _type: "work",
      title: "Educational Platform",
      slug: {
        _type: "slug",
        current: "educational-platform",
      },
      description: "Interactive learning platform for remote education",
      core: {
        producerName: "Alex Rivera",
        clientName: "EduTech Inc",
        projectTitle: "Educational Platform",
        projectCategory: "Education",
        projectChallenge:
          "Building an engaging remote learning experience for K-12 students",
        projectTechStack: ["Vue.js", "Firebase", "WebRTC", "TailwindCSS"],
      },
      brandDevelopment: {
        purpose: {
          title: "Educational Innovation",
          description:
            "Revolutionizing remote learning through interactive technology",
        },
        audience: {
          title: "Students and Educators",
          description:
            "K-12 students, teachers, and educational administrators",
        },
        archetypes: [
          {
            title: "The Young Learner",
            description: "Students seeking engaging educational content",
          },
          {
            title: "The Educator",
            description: "Teachers adapting to digital education",
          },
        ],
      },
      webDesign: {
        designSystem: {
          title: "Educational Design System",
          description:
            "Age-appropriate and accessible design system for learning",
        },
      },
      webDevelopment: {
        features: [
          {
            title: "Interactive Lessons",
            description: "Real-time collaborative learning environments",
          },
          {
            title: "Progress Tracking",
            description: "Comprehensive analytics and progress monitoring",
          },
        ],
      },
    },
  ],
};

async function seedWorks() {
  try {
    console.log("🌱 Starting work items seeding...");

    const transaction = client.transaction();

    seedData.works.forEach((work) => {
      transaction.create(work);
    });

    await transaction.commit();

    console.log("✅ Work items seeded successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

// Run the seed function
seedWorks();
