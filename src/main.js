import "./styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("frame");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    maxIndex: 382,
}

let imgLoaded = 0;
let images = [];

const preload = () => {
    for (let i = 1; i <= frames.maxIndex; i++) {
        const img = new Image();
        img.src = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
        img.onload = () => {
            imgLoaded++;
            if (imgLoaded === frames.maxIndex) {
                loadImage(frames.currentIndex);
                startAnimation();
            }
        }
        images.push(img);
    }
}

const loadImage = (index) => {
    if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight); // (img, x1, y1, x2, y2)
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        frames.currentIndex = index
    }
    
}

const startAnimation = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            bottom: "bottom bottom",
            scrub: 2,
        }
    });

    tl.to(frames,{
        currentIndex: frames.maxIndex,
        onUpdate: () => {
            loadImage(Math.floor(frames.currentIndex));
        }
    })
}

preload();