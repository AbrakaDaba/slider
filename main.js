import { data } from './data.js';

class Component{
    constructor(parentEl,data){
        this.parentEl = parentEl;
        this.data = data;
        this.infinite = data.infinite;
        this.autoplay = data.autoplay;
        this.interval = data.interval
        this.animationType = data.animationType;
    }
    init(){
        window.addEventListener('resize', function(){
            console.log(this);
        })
        this.selectors = {
            ctx: ".js-slider",
            sliderWrapp: ".js-slider__wrapper",
            slide: ".js-slider__item",
            title: ".js-slider__title",
            button: ".js-slider__btn",
        }
        this.dynamicClasses = {
            ctx: ["slider","js-slider"],
            sliderWrapp: ["js-slider__wrapper","slider__wrapper"],
            slide: ["slider__item", "js-slider__item"],
            title: "js-slider__title",
            button: "js-slider__btn",
            rightArrow: ["slider__arrow","slider__arrow--right"],
            leftArrow: ["slider__arrow","slider__arrow--left"],
        }
        this.stateClasses = {
            sliderArrowActive: "slider__arrow--active",
            sliderWrapLeft: "slider__wrapper--left",
            sliderWrapRight: "slider__wrapper--right",
            arrowDisabled: "slider__arrow--disabled"
        }
        this.ctx = this.createCtx();
        console.log(this.ctx);
        this.createEl();
        this.sliderWrapp = this.ctx.querySelector(this.selectors.sliderWrapp);
        console.log(this.sliderWrapp);
        this.currentWidth = this.getCurrentWidth();
        // this.counter = 0;
        this.position = 0;
        this.createArrowBtns();
        this.checkInfiniteStatus();
        this.checkAutoplay();
        this.checkAnimationType();
        this.checkPositionStatus();
    }
    checkInfiniteStatus(){

    }
    checkPositionStatus(){
        // let eventHendler;
        if(this.position <= 0){
            this.position = 0;
            // this.disableLeftArrow();
            // eventHendler = 0; 
        }else if(this.position >= this.currentWidth * (this.data.items.length - 1)){
            this.counter = this.data.items.length;
            this.position = this.currentWidth * (this.data.items.length - 2); 
            // this.disableRightArrow();
            // eventHendler = 0;
        }else{
            // if(eventHendler==0){
                // this.enableRightArrow();
                // this.enableLeftArrow();
            // }
            this.position = this.position;
            // eventhendler = eventHendler+2;
            // console.log(eventHendler);
        }
    }
    checkAutoplay(){
        if(this.autoplay == true){
            this.sliderInterval = setInterval(this.autoPlay.bind(this),this.interval);
        }
    }
    autoPlay(){
        console.log(this.position, (this.currentWidth * (this.data.items.length - 2)));
        if(this.position !== this.currentWidth * (this.data.items.length - 2)){
            this.slideRight();
            console.log("slidiiiing");
        }else{
            clearInterval(this.sliderInterval);
            console.log("stopSliddiiiing");
        }
    }
    checkAnimationType(){
        
    }
    disableRightArrow(){
        this.rightArrowBtn.classList.add(this.stateClasses.arrowDisabled)
        this.rightArrowBtn.removeEventListener('click', this.slideRight);
    }
    enableRightArrow(){
        this.rightArrowBtn.classList.remove(this.stateClasses.arrowDisabled);
        this.rightArrowBtn.addEventListener('click', this.slideRight.bind(this));
    }
    disableLeftArrow(){
        this.leftArrowBtn.classList.add(this.stateClasses.arrowDisabled)
        this.leftArrowBtn.removeEventListener('click', this.slideLeft);
    }
    enableLeftArrow(){
        this.leftArrowBtn.classList.remove(this.stateClasses.arrowDisabled);
        this.leftArrowBtn.addEventListener('click', this.slideLeft.bind(this));
    }
    getCurrentWidth(){
        let currentWidth = this.ctx.offsetWidth;
        console.log(this.ctx.offsetWidth, currentWidth);
        return currentWidth;
    }
    createCtx(){ 
        let ctx = document.createElement('div');
        ctx.classList.add(...this.dynamicClasses.ctx);
        document.querySelector(this.parentEl).append(ctx);
        return ctx;
    }
    createEl(){
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
    createArrowBtns(){
        let leftArrow = document.createElement("button");
        leftArrow.classList.add(...this.dynamicClasses.leftArrow);
        leftArrow.innerHTML="&#8249;";
        leftArrow.onclick = this.slideLeft.bind(this);
        let rightArrow = document.createElement("button");
        rightArrow.classList.add(...this.dynamicClasses.rightArrow);
        rightArrow.innerHTML="&#8250;";
        rightArrow.onclick = this.slideRight.bind(this);
        this.ctx.append(leftArrow, rightArrow);
        this.leftArrowBtn = leftArrow;
        this.rightArrowBtn = rightArrow;
    }
    slideLeft(){
        this.position -= this.currentWidth;
        this.sliderWrapp.style.transform ="translateX(-"+this.position+"px)";
        this.counter--;
        console.log(this.counter,this.position);
        this.checkPositionStatus();
    }
    slideRight(){ 
        this.position += this.currentWidth;
        this.sliderWrapp.style.transform ="translateX(-"+this.position+"px)";
        this.counter++; 
        this.checkPositionStatus();
    }
}


function createComponent(){
    let slider = new Component(".main", data);
    slider.init();
}

createComponent();
createComponent();
createComponent();