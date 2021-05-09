import { DialogOptions } from './interfaces/dialog-options.interface';

/**
 * Class Portal
 *
 * Contains the logic for creating the outlet
 */
export class Portal {
    protected static _portal?: Portal;
    protected static _portalMap = new Map<string, Portal>();

    /**
     * Get the default portal used for displaying dialogs when no others is created
     */
    public static get default() {
        if (!this._portal) {
            // Create element
            const element = document.createElement('div');
            element.className = 'dialox-portal';
            document.body.append(element);

            this._portal = new Portal(element, {});
        }

        return this._portal;
    }

    /**
     * Create portal instance and save reference to it for later use
     *
     * @param {string } name
     * @param {Element | string} element
     * @param {DialogOptions} options
     * @returns {Portal}
     */
    public static create(name: string, element: Element | string, options: DialogOptions) {
        const portal = new Portal(element, options);

        // Save refence to portal instance in map so it easily can be accessed later on
        this._portalMap.set(name, portal);

        return portal;
    }

    /**
     * Get portal instance by its name
     *
     * @param {string} name
     * @returns {Portal | undefined}
     */
    public static get(name: string) {
        return this._portalMap.get(name);
    }

    protected element: Element;
    protected overlayDiv: HTMLDivElement;
    protected contentDiv: HTMLDivElement;

    /**
     * Portal constructor. Please, use create() method to instantiate this class
     *
     * @param {Element | string} element
     * @param {DialogOptions} options
     */
    constructor(element: string | Element, protected options: DialogOptions) {
        // Default options
        options = {
            overlay: {
                className: '',
                ...options.overlay,
            },
            ...options,
        };

        // If element is given by selector, then find it in the DOM
        if (typeof element === 'string') {
            const domElement = document.querySelector(element);

            // Show error in console if no element matched the selector
            if (!domElement) {
                console.error(
                    `Dialox portal creation failed: Element of selector '${element}' could not be found in the dom`
                );
                return;
            }

            element = domElement;
        }

        // Intialize element property
        this.element = element;

        // Create overlay div
        this.overlayDiv = document.createElement('div');
        if (options.overlay?.className) {
            this.overlayDiv.classList.add(options.overlay?.className);
        }
        
        // Create content div
        this.contentDiv = document.createElement('div');
        if (options.content.)
        this.element.append(this.overlayDiv);
    }
}
