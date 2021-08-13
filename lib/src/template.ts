export function template(url: string): any {
    const element = document.getElementById(url);
    if (element) {
        if (element.getAttribute('type') == 'text/ng-template') {
            return element.innerHTML;
        }
        else if (element.getAttribute('type') == 'text/json') {
            return JSON.parse(element.innerHTML);
        }
    }
}
