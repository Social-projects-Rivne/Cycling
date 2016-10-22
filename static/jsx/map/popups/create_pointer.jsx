import React        from 'react';
import { Popup } from 'react-leaflet';

function CreatePointerPopup() {
        return (
            `<div>
                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                Launch demo modal
                </button>

            </div>`
        );
    };

export default CreatePointerPopup;