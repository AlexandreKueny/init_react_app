import React, { FC } from 'react';
import styles from './TemplateName.module.scss';

interface TemplateNameProps {
}

const TemplateName: FC<TemplateNameProps> = () => {
    return (
        <div className={styles.templateName} data-testid="templateName">
            <h1>TemplateName component</h1>
        </div>
    );
}

export default TemplateName;