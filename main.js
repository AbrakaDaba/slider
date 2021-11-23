import {
    data
} from './data.js';

class Slider {
    constructor(parentEl, data) {
        this.parentEl = parentEl;
        this.data = data;
        this.infinite = data.infinite;
        this.autoplay = data.autoplay;
        this.interval = data.interval
        this.animationType = data.animationType;
    }
    init() {

        this.selectors = {
            ctx: ".js-slider",
            sliderWrapp: ".js-slider__wrapper",
            slide: ".js-slider__item",
            title: ".js-slider__title",
            button: ".js-slider__btn"
        }
        this.dynamicClasses = {
            ctx: ["slider", "js-slider"],
            sliderWrapp: ["js-slider__wrapper", "slider__wrapper"],
            slide: ["slider__item", "js-slider__item"],
            title: "js-slider__title",
            button: "js-slider__btn",
            rightArrow: ["slider__arrow", "slider__arrow--right"],
            leftArrow: ["slider__arrow", "slider__arrow--left"]
        }
        this.stateClasses = {
            sliderArrowActive: "slider__arrow--active",
            sliderWrapLeft: "slider__wrapper--left",
            sliderWrapRight: "slider__wrapper--right",
            arrowDisabled: "slider__arrow--disabled"
        }
        this.ctx = this.createCtx();
        this.leftArrowBtn = this.createLeftArrow();
        this.rightArrowBtn = this.createRightArrow();
        this.slidesNum = this.data.items.length;
        this.createEl();
        this.sliderWrapp = this.ctx.querySelector(this.selectors.sliderWrapp);
        this.currentWidth = this.getCurrentWidth();
        this.position = 1; //first slide in the viewport
        this.checkInfiniteStatus();
        this.checkAutoplay();
        this.checkAnimationType();
        this.checkPositionStatus();
        this.leftArrowBtn.onclick = this.slideLeft.bind(this);
        this.rightArrowBtn.onclick = this.slideRight.bind(this);
        window.addEventListener('resize', this.handleWindowResize.bind(this))
    }

    handleWindowResize() {
        this.getCurrentWidth();
        this.slideToSlide(this.position);
    }
    checkInfiniteStatus() {

    }
    checkPositionStatus(index) { 
        if(index == this.slidesNum){
            index = this.slidesNum
            this.position = index;
            this.disableRightArrow();
            return index;
        }else if(index == 0){
            index = 1;
            this.position = index;
            this.disableLeftArrow();
            return index;
        }else{
            this.enableBothArrows();
            return index;
        } 
    }
    checkAutoplay() {
        if (this.autoplay == true) {
            this.sliderInterval = setInterval(this.autoPlay.bind(this), this.interval);
        }
    }
    autoPlay() {
        if (this.position !== this.data.items.length) {
            this.slideRight();
            console.log("slidiiiing");
        } else {
            this.position = 0;
            this.slideRight();
            // clearInterval(this.sliderInterval);
            
            console.log("stopSliddiiiing");
        }
    }
    checkAnimationType() {

    }
    disableRightArrow() {
        this.rightArrowBtn.classList.add(this.stateClasses.arrowDisabled) 
    }
    disableLeftArrow() {
        this.leftArrowBtn.classList.add(this.stateClasses.arrowDisabled) 
    }
    enableBothArrows() {
        this.rightArrowBtn.classList.remove(this.stateClasses.arrowDisabled); 
        this.leftArrowBtn.classList.remove(this.stateClasses.arrowDisabled); 
    }
    getCurrentWidth() {
        let currentWidth = this.ctx.querySelector(this.selectors.slide).offsetWidth;
        this.currentWidth = currentWidth;
    }
    createCtx() {
        let ctx = document.createElement('div');
        ctx.classList.add(...this.dynamicClasses.ctx);
        document.querySelector(this.parentEl).append(ctx);
        return ctx;
    }
    createEl() {
        let newElWrapp = document.createElement('section');
        newElWrapp.classList.add(...this.dynamicClasses.sliderWrapp);
        this.data.items.forEach(el => {
            let newEl = document.createElement('article');
            newEl.classList.add(...this.dynamicClasses.slide);
            newEl.style.backgroundImage = `url(${el.img})`;
            let elContent = `
            <h2 class="slider__title">${el.title}</h2>
            <a href="${el.buttonLink}" class="slider__button">${el.buttonText}</a>
            `
            newEl.innerHTML = elContent;
            newElWrapp.append(newEl)
        });
        this.ctx.append(newElWrapp);
    }
    createLeftArrow() {
        let leftArrow = document.createElement("button");
        leftArrow.classList.add(...this.dynamicClasses.leftArrow);
        leftArrow.innerHTML = "&#8249;";
        this.ctx.append(leftArrow);
        return leftArrow;
    }
    createRightArrow() {
        let rightArrow = document.createElement("button");
        rightArrow.classList.add(...this.dynamicClasses.rightArrow);
        rightArrow.innerHTML = "&#8250;";
        this.ctx.append(rightArrow);
        return rightArrow;
    }
    slideLeft() { 
        let index = this.checkPositionStatus(--this.position);
        this.slideToSlide(index);
    }
    slideRight() { 
        let index = this.checkPositionStatus(++this.position);
        this.slideToSlide(index);
    }
    slideToSlide(index) {
        this.getCurrentWidth();
        let route = this.currentWidth * (index - 1);
        this.sliderWrapp.style.transform = "translateX(-" + route + "px)";
    }
}


function createComponent() {
    let slider = new Slider(".main", data);
    slider.init();
}

createComponent();