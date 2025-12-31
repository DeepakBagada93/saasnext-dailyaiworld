declare module 'react-quill' {
    import React from 'react';
    export interface ReactQuillProps {
        theme?: string;
        modules?: any;
        formats?: string[];
        value?: string;
        onChange?: (content: string, delta: any, source: string, editor: any) => void;
        className?: string;
        placeholder?: string;
        readOnly?: boolean;
        bounds?: string | HTMLElement;
        scrollingContainer?: string | HTMLElement;
        preserveWhitespace?: boolean;
    }
    export default class ReactQuill extends React.Component<ReactQuillProps> { }
}
