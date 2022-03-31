
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls:false,
    responsive: {
        640: {
          edgePadding: 20,
          gutter: 20,
          items: 1
        },
        700: {
        //   gutter: 30,
          items: 1,
        },
        900: {
          items: 1,
        }
      }
  });

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});


const content = document.querySelectorAll('.catalog-item__content'),
    list = document.querySelectorAll('.catalog-item__list ');

let btnGo = document.querySelectorAll('.catalog-item__link'),
    btnBack = document.querySelectorAll('.catalog-item__back');

const tabs = document.querySelectorAll('.catalog__tab');

function activatedTab(i = 0) {
    tabs.forEach(tab => {
        tab.classList.remove('catalog__tab_active');
    })
    tabs[i].classList.add('catalog__tab_active');
}
activatedTab();

tabs.forEach((tab,i)=> {
    tab.addEventListener('click', function() {
        activatedTab(i)
    })
})

function mainShow(elem){

    elem.forEach((item,i)=>{
        item.addEventListener('click',(e)=>{
            e.preventDefault();
                if (elem == btnGo) {
                    showList(i);
                } else {
                    showContent(i);
                }
        })
    })
}

 function showList(i = 0) {
     content[i].classList.remove('catalog-item__content_active');
     list[i].classList.add('catalog-item__list_active');
 }

 function showContent(i = 0) {
     content[i].classList.add('catalog-item__content_active');
     list[i].classList.remove('catalog-item__list_active');
 }
 showList();
 showContent();

 mainShow(btnGo);
 mainShow(btnBack);
 //modal


const modalDescr = document.querySelectorAll('.modal__descr'),
     subtitle = document.querySelectorAll('.catalog-item__subtitle'),
     overlay = document.querySelector('.overlay');


function showModal(wrapper, modalSelector) {
    const modal = document.querySelector(modalSelector);
    wrapper.style.display = 'block';
    modal.style.display = 'block';
};

function hideModal(wrapper, modalSelector) {
    const modal = document.querySelector(modalSelector);
    wrapper.style.display = 'none';
    modal.style.display = 'none';
};

function modalBuyInfo(i) {
    modalDescr[1].innerText = subtitle[i].innerText;
}

function bindModal(triggerSelector, closeSelector, modalSelector) {
    const trigger = document.querySelectorAll(triggerSelector),
        close = document.querySelectorAll(closeSelector);

    trigger.forEach((item, i) => {
        item.addEventListener('click', () => {
            showModal(overlay, modalSelector)
            modalBuyInfo(i);
        })
    })
    close.forEach((item) => {
        item.addEventListener('click', (e) => {
            hideModal(overlay, modalSelector)
        })
    })


    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.keydown === 'escape') {
            hideModal(overlay, modalSelector)
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal(overlay, modalSelector)
        }
    })
}
bindModal('[data-modal=consultation]', '.modal__close', '#consultation');
bindModal('[data-modal=buy]', '.modal__close', '#order');



//validate
const message = {
    name : 'Пожалуйста, заполните форму с именем',
    phone : 'Пожалуйста, укажите номер телефона',
    email : 'Ваш email не корректен, или же отсутствует'
}


function bindFormsMessage(fromsSelector, messageBlockSelector, inputsSelector) {
    const forms = document.querySelector(fromsSelector),
        messageBlock = forms.querySelectorAll(messageBlockSelector),
        inputs = forms.querySelectorAll(inputsSelector);


    forms.addEventListener('submit', (e) => {
        e.preventDefault();
        errorFunc(inputs, messageBlock);
    })
}


function errorFunc(inputs, messageBlock) {
    for (let index = 0; index < inputs.length; index++) {

        const input = inputs[index];

        if (input.classList.contains('form-control_name')) {

            if (input.value == 0) {

                formError(input);
                addMessageBlock(index, message.name, messageBlock)
                setTimeout(() => {
                    formRemoveError(input, index);
                    removeMessageBlock(index, messageBlock)
                }, 3000);

            };

        } else if (input.classList.contains('form-control_tel')) {

            if (!telRegExp(input)) {

                formError(input);
                addMessageBlock(index, message.phone, messageBlock)
                setTimeout(() => {
                    formRemoveError(input, index);
                    removeMessageBlock(index, messageBlock)
                }, 3000);

            };
        } else if (input.classList.contains('form-control_email')) {

            if (!emailRegExp(input)) {

                formError(input);
                addMessageBlock(index, message.email, messageBlock)
                setTimeout(() => {
                    formRemoveError(input, index);
                    removeMessageBlock(index, messageBlock)
                }, 3000);

            };
        };
    }
}

function removeMessageBlock(index, messageBlockSelector) {
    const messageBlock = messageBlockSelector
    messageBlock[index].style.display = 'none'
};
function addMessageBlock(index, message, messageBlockSelector) {
    const messageBlock = messageBlockSelector
    messageBlock[index].style.display = 'block'
    messageBlock[index].innerHTML = message;
};

function formError(input) {
    input.classList.add('form-error');
};

function formRemoveError(input) {
    input.classList.remove('form-error');
};

function telRegExp(input) {
    return /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/.test(input.value);
};

function emailRegExp(input) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value);
};


bindFormsMessage('#consultation-form','.message','input');
bindFormsMessage('#consultation .feed-form','.message','input');
bindFormsMessage('#order .feed-form','.message','input');

// Inputs Mask


function inputsMask(input,typeMask) {
    
    const phones = document.querySelectorAll(input);

    const maskOptions = { 
        mask: typeMask
    }
    if (!phones) return
        phones.forEach(phone => {
        IMask(phone, maskOptions)
    }) 
}

inputsMask('.form-control_tel','+{7}(000)000-00-00');

// formPost
const checkInputs =(inputSelector)=>{
    const input = document.querySelectorAll(inputSelector)
    input.forEach(item=>{
        
        item.addEventListener('input',()=>{
            item.value = item.value.replace(/\D/,'')
        })
    })
    
}

const form = document.querySelectorAll('form'),
input = document.querySelectorAll('input');



checkInputs('input[name="user_phone"]');

function checkInputsValue(formSelector) {
    const form = formSelector,
    inputs = form.querySelectorAll('input');

    let found = false;

    inputs.forEach((input) => {

        if (input.value !== '') {
            found = true;
        }
    })
     return found;
}


const postData = async(url, data) => {
  
    let res = await fetch(url,{
        method: 'POST',
        body: data
    });
    return  await res.text();     //because return text data  
};

const inputReset = () =>{
    input.forEach(item =>{
        item.value = '';
    })
};



form.forEach(item => {
    item.addEventListener('submit', (e) => {
        e.preventDefault();

        let result = checkInputsValue(e.target);

        let formData = new FormData(item);
        
        postData('mailer/smart.php',formData)
        .then(() => {
                if (result) {
                    hideModal(overlay, '#consultation')
                    hideModal(overlay, '#order')
                    showModal(overlay,'#thanks')     
                }
        }).catch(()=>{
            if (result) {
                hideModal(overlay, '#consultation')
                hideModal(overlay, '#order')
                showModal(overlay,'#thanks')     //if the server is down
            }
        })
        .finally(() => {
            inputReset();
             setTimeout(() => {
                hideModal(overlay,'#thanks');
             },3000);
        })
    })
})
//smooth scroll and pageup


function arrowVisible(elementSelector,num) {
    const pageup = document.querySelector(elementSelector);
    window.addEventListener('scroll', () => {
        const scr = window.scrollY
        if (scr >= num) { 
            pageup.style.display = 'block'
        } else {
            pageup.style.display = 'none'
        }
    });
}

arrowVisible('.pageup', 1600);

const link = document.querySelector("a[href='#up']");
 
link.addEventListener("click", clickHandler);
 
function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
 
  scroll({
    top: offsetTop,
    behavior: "smooth"
  });
}

//animate with biblary "wow.js"

new WOW().init();