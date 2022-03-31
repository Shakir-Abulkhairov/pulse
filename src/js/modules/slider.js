function slider(){
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
    
}
export default slider;