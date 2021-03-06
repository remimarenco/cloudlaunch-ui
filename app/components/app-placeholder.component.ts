import { Component, ComponentRef, ViewContainerRef, ComponentResolver } from '@angular/core';

declare var System: any;

@Component({
   selector: 'app-placeholder',
   template: `<span #content></span>`,
   inputs: ['initialConfig', 'componentPath', 'componentName'],
})
export class AppPlaceHolderComponent {
   initialConfig: any;

   _componentPath: string;
   _componentName: string;
   _currentComponent: ComponentRef<any>;

   get componentPath() {
      return this._componentPath;
   }

   set componentPath(value) {
      this.reloadComponentIfNeeded(value, this.componentName);
      this._componentPath = value;
   }

   get componentName() {
      return this._componentName;
   }

   set componentName(value) {
      this.reloadComponentIfNeeded(this.componentPath, value);
      this._componentName = value;
   }

   constructor(
      private viewContainerRef: ViewContainerRef,
      private componentResolver: ComponentResolver) {
   }

   private reloadComponentIfNeeded(componentPath: string, componentName: string) {
      if (componentPath && componentName && (this.componentPath != componentPath || this.componentName != componentName))
         this.reloadComponent();
   }

   private reloadComponent() {
      // Remove existing component
      if (this._currentComponent && this.viewContainerRef.length > 0) {
            this.viewContainerRef.remove(0);
      }
      // Add new component
      System.import(this.componentPath)
        .then(m => {
          this.componentResolver.resolveComponent(m[this.componentName]).then((factory: any) => {
            this._currentComponent = this.viewContainerRef.createComponent(factory, 0,  this.viewContainerRef.injector);
            this._currentComponent.instance.initialConfig = this.initialConfig;
          });
        });
   }

}
