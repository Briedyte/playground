
import { useEffect, useState } from "react";
import { deleteFromLocalStorage, LocalStorage, localStorageEventEmitter } from "utils/localStorage";
import BinImg from 'images/bin.png';
import IconButton from "components/buttons/IconButton";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
`

const Text = styled.p`
    dislay: block;
`

const HighScore = () => {
    const [highScore, setHighScore] = useState<string | null>(localStorage.getItem(LocalStorage.highScore));

    useEffect(() => {
        const listener = () => {
            setHighScore(localStorage.getItem(LocalStorage.highScore));
        };
    
        localStorageEventEmitter.addListener("change", listener);
    
        return () => {
          localStorageEventEmitter.removeListener("change", listener);
        };
      }, []);

    return highScore ? (<Container><p>High score: {highScore}</p>
    <IconButton iconSrc={BinImg} onClick={() => deleteFromLocalStorage(LocalStorage.highScore)} />
    </Container>) : null;
}
export default HighScore;
