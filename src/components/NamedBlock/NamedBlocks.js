import React, { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { observer } from 'mobx-react-lite';
import styles from './NamedBlocks.module.scss';
import { ReactComponent as PlusIcon } from '../../assets/img/plus.svg';
import { NamedBlock } from './NamedBlock';
import { NamedBlockModal } from './NamedBlockModal';
import useDimensions from '../../hooks/useDimensions';
const emptyFunction = () => {};

export const  NamedBlocks = observer(
  ({
     allowCreation = true,
     allowModifying = true,
     allowDeletion = true,
     blocksList = [],
    createTitle,
    onDeleteItem = emptyFunction,
    loading = false,
    loadMore = emptyFunction,
    setPage = emptyFunction,
    getBlocks = emptyFunction,
    onBlockClick = emptyFunction,
    clearBlocks = emptyFunction,
    renderModalBodyCreate = emptyFunction,
    renderModalBodyUpdate = emptyFunction,
    showColor = false,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const titleRef = useRef(null);
    const { width, height } = useDimensions(titleRef);
    const openModal = () => {
      setIsOpen(true);
    };

    useEffect(() => {
      const modelSize = 170;
      const perPage = Math.floor((width * height) / (modelSize * modelSize));
      if (perPage) {
        setPage(perPage);
        getBlocks(0, true);
      }
      return () => clearBlocks();
    }, [width, height]);

    return (
      <div className={styles.container} ref={titleRef} id='scrollable'>
        <InfiniteScroll
          dataLength={blocksList.length || 0}
          next={loadMore}
          hasMore
          loader={null}
          scrollableTarget='scrollable'
        >
          <Spin spinning={loading}>
            <section className={styles.blocksContainer}>
              {blocksList.map((blockItem) => {
                return (
                  <NamedBlock
                    allowModifying={allowModifying}
                    allowDeletion={allowDeletion}
                    showColor={showColor}
                    key={blockItem.id}
                    block={blockItem}
                    onDelete={onDeleteItem}
                    onClick={onBlockClick}
                    renderModalBody={renderModalBodyUpdate}
                  />
                );
              })}
              {allowCreation ? (<button className={styles.addBtn} onClick={openModal} type='button'>
                <PlusIcon />
              </button>) : <></>}
            </section>
          </Spin>
        </InfiniteScroll>
        <NamedBlockModal isOpen={isOpen} setIsOpen={setIsOpen} title={createTitle} renderBody={renderModalBodyCreate} />
      </div>
    );
  },
);
