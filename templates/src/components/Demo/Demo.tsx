import React, { FC, useState } from 'react';
import styles from './Demo.module.scss';
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";
import Collapse from "../Collapse/Collapse";
import Checkbox from "../Checkbox/Checkbox";
import Radio from "../Radio/Radio";

interface DemoProps {
}

const Demo: FC<DemoProps> = () => {
    const [buttonOutlined, setButtonOutlined] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [checked, setChecked] = useState(false);
    const [checkboxReversed, setCheckboxReversed] = useState(false);
    const [checkboxDisabled, setCheckboxDisabled] = useState(false);

    const [radioValue, setRadioValue] = useState('')
    const [radioReversed, setRadioReversed] = useState(false);
    const [radioInline, setRadioInline] = useState(false);
    const [radioDisabled, setRadioDisabled] = useState(false);

    return (
        <div className={styles.demo} data-testid="demo">
            <Spinner />
            <div>
                <h2>Button</h2>
                <button onClick={() => setButtonOutlined(!buttonOutlined)}>{buttonOutlined ? 'Plain' : 'Ouline'}</button>
                <button onClick={() => setButtonLoading(!buttonLoading)}>{buttonLoading ? 'Not loading' : 'Loading'}</button>
                <button onClick={() => setButtonDisabled(!buttonDisabled)}>{buttonDisabled ? 'Not disabled' : 'Disabled'}</button>
                <Button outline={buttonOutlined} loading={buttonLoading} disabled={buttonDisabled} onClick={() => console.log('click')}>Button</Button>
            </div>
            <div>
                <h2>Collapse</h2>
                <Collapse title="Title" subtitle="Subtitle">
                    <div>Collapse content</div>
                </Collapse>
            </div>
            <div>
                <h2>Checkbox</h2>
                <button onClick={() => setCheckboxReversed(!checkboxReversed)}>{checkboxReversed ? 'Normal' : 'Reversed'}</button>
                <button onClick={() => setCheckboxDisabled(!checkboxDisabled)}>{checkboxDisabled ? 'Enabled' : 'Disabled'}</button>
                <Checkbox labelPosition={checkboxReversed ? 'left' : "right"} checked={checked} disabled={checkboxDisabled} onChange={setChecked} label="Label" />
            </div>
            <div>
                <h2>Radio</h2>
                <button onClick={() => setRadioReversed(!radioReversed)}>{radioReversed ? 'Normal' : 'Reversed'}</button>
                <button onClick={() => setRadioInline(!radioInline)}>{radioInline ? 'Normal' : 'Inline'}</button>
                <button onClick={() => setRadioDisabled(!radioDisabled)}>{radioDisabled ? 'Enabled' : 'Disabled'}</button>
                <Radio labelPosition={radioReversed ? 'left' : 'right'} inline={radioInline} disabled={radioDisabled} options={[{label: 'A', value: 'A'}, {label: 'B', value: 'B'}]} value={radioValue} onChange={setRadioValue} />
            </div>
        </div>
    );
}

export default Demo;