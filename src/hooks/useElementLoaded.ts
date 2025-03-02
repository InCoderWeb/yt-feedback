import { useState, useEffect, RefObject } from "react";

function useElementLoaded<T extends HTMLElement | null>(ref: RefObject<T> | null): boolean {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		const element = ref?.current;
		if (!element) return;

		// Define which element types are considered "loadable"
		const loadableTypes = [
			HTMLImageElement,
			HTMLIFrameElement,
			HTMLVideoElement,
			HTMLScriptElement,
			HTMLLinkElement,
		];
		const isLoadable = loadableTypes.some(
			(Type) => element instanceof Type
		);

		// For non-loadable elements (e.g. div, nav, span), consider them loaded immediately
		if (!isLoadable) {
			setIsLoaded(true);
			return;
		}

		// Define the load event handler
		const handleLoad = (): void => {
			setIsLoaded(true);
		};

		// For images, if already complete, mark as loaded immediately.
		if (element instanceof HTMLImageElement) {
			if (element.complete) {
				setIsLoaded(true);
			} else {
				element.addEventListener("load", handleLoad);
			}
		} else {
			// For other loadable elements, attach the "load" event listener
			element.addEventListener("load", handleLoad);
		}

		// Cleanup the event listener on unmount or if ref changes
		return () => {
			element.removeEventListener("load", handleLoad);
		};
	}, [ref]);

	return isLoaded;
}

export default useElementLoaded;