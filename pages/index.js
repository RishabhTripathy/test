import React, { useRef, useEffect, useState } from "react";
import Player from "./components/player";
import Nav from "./components/nav";
import { motion, useAnimation } from "framer-motion";
import Head from "next/head";

const projects = [
  {
    id: 1,
    title: "Matthias Leidinger | Arijit Singh | hehehe ",
    description:
      "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    link: "https://videos.pexels.com/video-files/2792370/2792370-hd_1280_720_30fps.mp4"
  },
  {
    id: 2,
    title: "Lord Voldemort | Arijit Singh | hehehe | Kuch bhii ",
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément Chapillon describes his latest highly captivating project Les rochers fauves (French for ‘The tawny rocks’).",
    link: "https://videos.pexels.com/video-files/4231734/4231734-hd_1280_720_24fps.mp4"
  },
  {
    id: 3,
    title: "Ronald Wheasly | Bloody Marry | Muggle",
    description:
      "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
    link: "https://videos.pexels.com/video-files/4761600/4761600-hd_1280_720_25fps.mp4"
  },
  {
    id: 4,
    title: "Nevil Longbottom | Anisht Dev |  ",
    description:
      "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
    link: "https://videos.pexels.com/video-files/3222809/3222809-hd_1280_720_30fps.mp4"
  },
  {
    id: 5,
    title: "Loona Lovegud | Severous Snape | Godfather",
    description:
      "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
    link: "https://videos.pexels.com/video-files/4631982/4631982-hd_1366_720_50fps.mp4"
  },
];

const Home = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const dotRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionIndexes = projects.map((_, index) => ({
        index,
        offsetTop: document.querySelector(`.section-${index}`).offsetTop,
        height: document.querySelector(`.section-${index}`).clientHeight,
      }));
  
      let activeIndex = -1;
  
      for (let i = 0; i < sectionIndexes.length; i++) {
        const { offsetTop, height } = sectionIndexes[i];
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          activeIndex = i;
          break;
        }
      }
  
      setActiveDotIndex(activeIndex);
    };
  
    // Add event listener only on the client side
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const scrollToSection = (index) => {
    const section = document.querySelector(`.section-${index}`);
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-full min-h-[100vh] w-screen relative ">
      <Nav />
      <div className=" smooth-scroll relative h-screen">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`section  section-${index} `}
           
          >
            <Player
              title={project.title}
              description={project.description}
              url={project.link}
            />
          </div>
        ))}
      </div>
      <div className="dot-container z-30">
        {projects.map((_, index) => (
          <div
            key={index}
            ref={(ref) => (dotRefs.current[index] = ref)}
            className={`dot ${activeDotIndex === index ? "active" : ""}`}
            onClick={() => {
              setActiveDotIndex(index);
              scrollToSection(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
