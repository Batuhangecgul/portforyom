import Scene from './components/canvas/Scene';
import Layout from './components/dom/Layout';
import StarField from './components/canvas/StarField';
import CameraRig from './components/canvas/CameraRig';
import FloatingCrystal from './components/canvas/FloatingCrystal';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import CustomCursor from './components/dom/CustomCursor';
import GrainOverlay from './components/dom/GrainOverlay';
import Preloader from './components/dom/Preloader';
import Navbar from './components/dom/Navbar';
import AmbientMusic from './components/dom/AmbientMusic';

function App() {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Navbar */}
      <Navbar />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Grain overlay */}
      <GrainOverlay />

      {/* Ambient music player */}
      <AmbientMusic />

      {/* 3D Scene */}
      <Scene>
        <StarField />
        <FloatingCrystal />
        <CameraRig />
      </Scene>

      {/* UI Content */}
      <Layout>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </Layout>
    </>
  );
}

export default App;

