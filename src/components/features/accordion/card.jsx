import React from "react";
import SlideToggle from "react-slide-toggle";

import { safeContent } from "~/src/utils/shared";

function Card(props) {
  const { title, expanded, adClass = "", type = "default", disabled } = props;

  return "default" === type ? (
    <SlideToggle collapsed={!disabled && expanded ? false : true}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <div className={`card ${adClass}`}>
          <div
            className='card-header'
            onClick={(e) => {
              if (!disabled) onToggle(e);
            }}>
            <h2 className='card-title'>
              <span
                className={`toggle-button ${toggleState.toLowerCase()}`}
                dangerouslySetInnerHTML={safeContent(title)}
                style={{ height: "auto" }}></span>
            </h2>
          </div>
          <div ref={setCollapsibleElement}>
            <div className='card-body'>{props.children}</div>
          </div>
        </div>
      )}
    </SlideToggle>
  ) : (
    <SlideToggle collapsed={!disabled && expanded ? false : true}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <div className={`acc-item ${adClass}`}>
          <h5>
            <span
              className={`toggle-button ${toggleState.toLowerCase()}`}
              dangerouslySetInnerHTML={safeContent(title)}
              onClick={(e) => {
                if (!disabled) onToggle(e);
              }}
              style={{ height: "auto" }}></span>
          </h5>
          <div ref={setCollapsibleElement}>
            <div className='collapse-wrap'>{props.children}</div>
          </div>
        </div>
      )}
    </SlideToggle>
  );
}

export default React.memo(Card);
