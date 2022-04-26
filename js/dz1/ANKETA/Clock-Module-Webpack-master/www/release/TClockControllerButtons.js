export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
                // контроллер при снятии флажка в представлении
                // перестает слушать изменения модели,
                // а при установке - продолжает
        this.view.setChangeHandler(                    
            value => {
                if (value == 'старт') {
                    this.registerModelHandler();
                } else if(value == 'стоп') {
                    this.model.setChangeListener(null);
                } else return;
            }
        );
        this.registerModelHandler();
    }

    registerModelHandler() {
        this.model.setChangeListener(
            () => this.handleModelChange());
        this.handleModelChange();
    }

    handleModelChange() {
        // при вызове функции обратного вызова
        // контроллер перерисовывает представление
        this.view.render(this.model);
    }
}
