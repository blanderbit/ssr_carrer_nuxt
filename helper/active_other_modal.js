

export default {
    open_modal(vue, title, image, left, top, height, width){
        vue.$store.dispatch('modal_data/action_active_modal', {
            name: 'send_and_copy_modal',
            active: true,
            modal_data: {
                title: title, //'Thank you for your message! We’ll contact you soon',
                image: image, //'send_message.svg',
                left: left,//'32px',
                width: width, //'103px',
                height:height,//'148px',
                top: top//'12px;'
            },
        });
    }
}
