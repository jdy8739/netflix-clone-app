import React from "react";
import styled from "styled-components";
import { INowPlayingResult } from "../api";
import { makeImagePath } from "../utils";

const BoxElem = styled.div<{ path: string }>`
    background-image: url(${props => props.path});
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 100%;
`;

function SlideBox({ movieInfo }: { movieInfo?: INowPlayingResult }) {
    return (
        <BoxElem
        path={makeImagePath(movieInfo?.backdrop_path || '', 'w500')}
        >
            { movieInfo?.title }
        </BoxElem>
    )
};

export default React.memo(SlideBox);