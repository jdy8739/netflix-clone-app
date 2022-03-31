import { ISearchedResult } from "../searchApi";
import { makeImagePath } from "../utils";
import { ModalImage, ModalInfo, Overview, Title } from "./Modal";

function SearchModal({ clicked }: { clicked?: ISearchedResult }) {
    return (
        <>
            <ModalInfo>
                <ModalImage path={makeImagePath(clicked?.backdrop_path || '')}>
                    <Title>{  }</Title>
                </ModalImage>
                <Overview>
                    { 
                        
                    }
                </Overview>
            </ModalInfo>
        </>
    )
};

export default SearchModal;