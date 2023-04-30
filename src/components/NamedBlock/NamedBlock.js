import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import styles from './NamedBlocks.module.scss';
import { DATE_FORMATS, toDate } from '../../utils/dates';
import { NamedBlockModal } from './NamedBlockModal';
import EditIcon from "../Icons/EditIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import Stars from "../Film/Stars";

export const NamedBlock = observer(
  ({ allowModifying = true, allowDeletion = true, showColor, block, onDelete, modalSubmit, placeholder, onClick, renderModalBody }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const openModal = () => {
      setIsOpen(true);
    };
    const onClickEditBtn = (e) => {
      e.stopPropagation();
      openModal();
    };
    const onClickDeleteBtn = async (e) => {
      e.stopPropagation();
      // const confirmed = await asyncConfirm({ title: t('namedBlocks.deleteBlock', { name: block.name }) });
      // if (confirmed) {
        onDelete(block.id);
      // }

      setIsOpen(false);
    };

    const onUpdate = (form, utils) => {
      modalSubmit(block.id, form, utils);
    };

    return (
      <>
        <button className={styles.block} onClick={onClick.bind(null, block.id)} type='button'>
          <p className={styles.block_lastUpdate} />
          {showColor && <span className={styles.block__color} style={{ backgroundColor: block.color }} />}
          <img src={block.photoUrl}
               height={"150px"} width={"150px"}/>
          <h3 className={styles.block_title}>{block.name}</h3>
          <p className={styles.block_lastUpdate}>
            {t('general.lastUpdate')}
            {toDate(block.lastUpdate, DATE_FORMATS.FULL_MONTH)}
          </p>
            <div className={styles.block_icons}>
              <EditIcon visible={allowModifying} onClick={onClickEditBtn} />
              <DeleteIcon visible={allowDeletion} onClick={onClickDeleteBtn} />
          </div>
        </button>
        <NamedBlockModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          item={block}
          onSubmit={onUpdate}
          placeholder={placeholder}
          title={t('namedBlocks.updateBlock', { name: block.name })}
          renderBody={renderModalBody}
        />
      </>
    );
  },
);
