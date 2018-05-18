import $ from 'jquery';

class Modal {
    constructor() {
        this.openModalButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");

        this.events();
    }

    events() {
        // Click the open modal button
        this.openModalButton.click(this.openModal.bind(this));

        // Click X modal button
        this.closeModalButton.click(this.closeModal.bind(this));

        // Push ANY key
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(event) {
        if(event.keyCode == 27) {
            this.closeModal();
        }
    }

    openModal() {
        this.modal.addClass("modal--is-visible");
        return false;
    }

    closeModal() {
        this.modal.removeClass("modal--is-visible");
    }
}

export default Modal;