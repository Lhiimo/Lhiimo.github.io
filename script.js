const filterButtons = document.querySelectorAll(".filter-button");
const workCards = document.querySelectorAll(".work-card");
const emptyMessage = document.querySelector(".empty-message");

const projects = {
    "empty-palace": {
        title: "Empty Palace",
        type: "Environment / mood piece",
        description: "Atmospheric architectural artwork focused on scale, mood and dark fantasy presentation. includes a making-of video.",
        tags: ["Environment", "Mood", "Lighting", "Composition"],
        images: [
            "Images/EmptyPalace(art by Lhimo).png",
            "Images/EmptyPalace2(art by Lhimo).png",
            "Images/EmptyPalace3(art by Lhimo).png",
            "Images/EmptyPalace4(art by Lhimo).png",
            "Images/EmptyPalace Step-by-step(video).mp4"
        ],
        links: []
    },
    "cat-island": {
        title: "Cat Island",
        type: "Environment / diorama study",
        description: "Stylized diorama study focused on color, mood variation and hand-painted presentation. Presented as a visual study rather than a production-optimized asset.",
        tags: ["Environment", "Diorama", "Hand-Painted", "Substance Painter", "ZBrush", "Maya"],
        images: [
            "Images/Cat Island(day time).jpeg",
            "Images/Cat Island(day time)2.png",
            "Images/Cat Island(night time).PNG",
            "Images/Cat Island(night time)2.PNG"
        ],
        links: [
            { label: "View on Sketchfab", url: "https://sketchfab.com/3d-models/cat-island-e7a30e57808a46c9a56b1b1a2b378ac0" }
        ]
    },
    "sea-creatures": {
        title: "Sea Creatures",
        type: "Creatures / low-poly assets",
        description: "Low-poly marine creature set made for stylized game use, including manta ray, hammerhead shark, orca and humpback whale.",
        tags: ["Creatures", "Low-Poly", "Game Assets", "Stylized"],
        images: [
            "Images/sea creatures(Art by Lhimo).jpeg",
            "Images/sea creatures 2.jpeg",
            "Images/sea creatures 3.jpeg",
            "Images/sea creatures 4.jpeg",
            "Images/sea creatures 5.jpeg"
        ],
        links: [
            { label: "View on Sketchfab", url: "https://sketchfab.com/3d-models/sea-creatures-a9e579418f36468ba33902eeb8d9d96a" }
        ]
    },
    "carnotaurus": {
        title: "Carnotaurus",
        type: "Creature / stylized game asset",
        description: "Stylized creature model with animation tests, sculpted in ZBrush, UVs and animation in Blender, and textures in Substance Painter.",
        tags: ["Creature", "ZBrush", "Blender", "Substance Painter", "Animation"],
        images: [
            "Images/Carnotauro(art by Lhimo).jpg",
            "Images/Carnotauro02.PNG",
            "Images/CarnoWireframe.PNG",
            "Images/CarnoMatcap.PNG",
            "Images/CarnoMatcap+surface.PNG"
        ],
        links: [
            { label: "View on Sketchfab", url: "https://sketchfab.com/3d-models/carnotaurus-2ed3531d468841c2b635650a16abb353" }
        ]
    },
    "nemesis": {
        title: "Nemesis",
        type: "Character / creature design",
        description: "Character-focused renders exploring silhouette, form, lighting and presentation across multiple final images.",
        tags: ["Character", "Creature Design", "Rendering", "Presentation"],
        images: [
            "Images/Nemesis1.png",
            "Images/Nemesis2.png",
            "Images/Nemesis3.png",
            "Images/Nemesis4.png",
            "Images/Nemesis5.png"
        ],
        links: []
    },
    "moon-guardian": {
        title: "Moon Guardian",
        type: "Character / stylized design",
        description: "Stylized character study focused on shape language, expression and presentation across multiple image variations.",
        tags: ["Character", "Stylized", "Design", "Presentation"],
        images: [
            "Images/MoonGuardian(art by Lhimo) (1).jpg",
            "Images/MoonGuardian(art by Lhimo) (2).jpg",
            "Images/MoonGuardian(art by Lhimo) (3).jpg",
            "Images/MoonGuardian(art by Lhimo) (4).jpg",
            "Images/MoonGuardian(art by Lhimo) (5).jpg"
        ],
        links: []
    }
};

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.filter;
        let visibleCount = 0;

        filterButtons.forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");

        workCards.forEach((card) => {
            const shouldShow = selectedCategory === "all" || card.dataset.category === selectedCategory;
            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount += 1;
            }
        });

        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }
    });
});

const caseModal = document.querySelector("#case-modal");
const caseMainImage = document.querySelector("#case-main-image");
const caseMainVideo = document.querySelector("#case-main-video");
const caseThumbnails = document.querySelector("#case-thumbnails");
const caseTitle = document.querySelector("#case-title");
const caseType = document.querySelector("#case-type");
const caseDescription = document.querySelector("#case-description");
const caseTags = document.querySelector("#case-tags");
const caseActions = document.querySelector("#case-actions");
const caseClose = document.querySelector(".case-close");

function isVideoFile(source) {
    return /\.(mp4|webm|mov|m4v)$/i.test(source);
}

function setCaseMedia(project, index) {
    const source = project.images[index];
    const isVideo = isVideoFile(source);

    caseMainImage.hidden = isVideo;
    caseMainVideo.hidden = !isVideo;

    if (isVideo) {
        caseMainImage.removeAttribute("src");
        caseMainVideo.src = source;
        caseMainVideo.setAttribute("aria-label", `${project.title} video ${index + 1}`);
    } else {
        caseMainVideo.pause();
        caseMainVideo.removeAttribute("src");
        caseMainVideo.load();
        caseMainImage.src = source;
        caseMainImage.alt = `${project.title} image ${index + 1}`;
    }

    caseThumbnails.querySelectorAll(".case-thumbnail").forEach((button, buttonIndex) => {
        button.classList.toggle("is-active", buttonIndex === index);
    });
}

function openProject(projectId) {
    const project = projects[projectId];

    if (!project || !caseModal) {
        return;
    }

    caseTitle.textContent = project.title;
    caseType.textContent = project.type;
    caseDescription.textContent = project.description;

    caseTags.replaceChildren(...project.tags.map((tag) => {
        const item = document.createElement("li");
        item.textContent = tag;
        return item;
    }));

    caseActions.replaceChildren(...project.links.map((link) => {
        const anchor = document.createElement("a");
        anchor.className = "button button-secondary";
        anchor.href = link.url;
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
        anchor.textContent = link.label;
        return anchor;
    }));

    caseThumbnails.replaceChildren(...project.images.map((source, index) => {
        const button = document.createElement("button");
        button.className = "case-thumbnail";
        button.type = "button";
        button.setAttribute("aria-label", `Show ${project.title} ${isVideoFile(source) ? "video" : "image"} ${index + 1}`);

        if (isVideoFile(source)) {
            const thumbnail = document.createElement("span");
            thumbnail.className = "case-thumbnail-label";
            thumbnail.textContent = "Video";
            button.append(thumbnail);
        } else {
            const thumbnail = document.createElement("img");
            thumbnail.src = source;
            thumbnail.alt = "";
            button.append(thumbnail);
        }

        button.addEventListener("click", () => setCaseMedia(project, index));
        return button;
    }));

    setCaseMedia(project, 0);

    if (typeof caseModal.showModal === "function") {
        caseModal.showModal();
    } else {
        caseModal.setAttribute("open", "");
    }
}

document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => openProject(button.dataset.project));
});

caseClose?.addEventListener("click", () => {
    caseModal.close();
});

caseModal?.addEventListener("click", (event) => {
    if (event.target === caseModal) {
        caseModal.close();
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && caseModal?.open) {
        caseModal.close();
    }
});

const modelSlides = document.querySelectorAll("[data-model-slide]");
const modelDots = document.querySelectorAll("[data-model-dot]");
const previousModelButton = document.querySelector("[data-carousel-prev]");
const nextModelButton = document.querySelector("[data-carousel-next]");
let activeModelIndex = 0;

function showModel(index) {
    if (modelSlides.length === 0) {
        return;
    }

    activeModelIndex = (index + modelSlides.length) % modelSlides.length;

    modelSlides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeModelIndex;
        slide.hidden = !isActive;
        slide.classList.toggle("is-active", isActive);
    });

    modelDots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === activeModelIndex);
    });
}

previousModelButton?.addEventListener("click", () => {
    showModel(activeModelIndex - 1);
});

nextModelButton?.addEventListener("click", () => {
    showModel(activeModelIndex + 1);
});

modelDots.forEach((dot) => {
    dot.addEventListener("click", () => {
        showModel(Number(dot.dataset.modelDot));
    });
});






