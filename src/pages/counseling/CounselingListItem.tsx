/** @jsxImportSource @emotion/react */
import { MouseEvent } from 'react';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import recordDelete from '/img/icon-counsling-record-delete.svg';
import { useNavigate } from 'react-router-dom';
import { CounselingListData } from './CounselingList';

const CounselingListItem = ({
  item,
  setCounselingRecord,
}: {
  item: CounselingListData;
  setCounselingRecord: React.Dispatch<React.SetStateAction<CounselingListData[]>>;
}) => {
  const navigate = useNavigate();

  const tags = item.tags.split('#').filter((tag) => tag !== '');

  const handleDelete = (e: MouseEvent, id: number) => {
    e.stopPropagation();
    //삭제 통신으로 교체 예정
    setCounselingRecord((data) => data.filter((dataItem) => dataItem.id !== id));
  };

  //상담 시작 날짜 가져오는 함수
  function formatDate(date: string) {
    const createdDate = new Date(date);

    const year = createdDate.getFullYear();
    const month = createdDate.getMonth() + 1;
    const day = createdDate.getDate();

    return `${year}.${month}.${day} `;
  }
  const consultationDate = formatDate(item?.updated_at);

  return (
    <div css={RecordItem} onClick={() => navigate(`/counseling/${item.id}`)}>
      <div css={ItemLeft} className="left">
        <p>
          최근 상담 <span className="upDate">{consultationDate}</span>
        </p>

        <div className="tags">
          {tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      </div>

      <div css={ItemRight} className="right">
        <p>{item.count}회</p>
        <button type="button" onClick={(e) => handleDelete(e, item.id)}>
          <span className="hidden">삭제</span>
        </button>
      </div>
    </div>
  );
};

export default CounselingListItem;

const RecordItem = css`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 1.8rem 2.4rem;
  border: 0.1rem solid ${variables.colors.gray10};
  box-shadow: 0 0 1rem ${variables.colors.gray10};
  border-radius: 1.2rem;
  color: ${variables.colors.gray100};
  font-size: 1.4rem;
`;

const ItemLeft = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .upDate {
    margin-left: 0.8rem;
  }

  .tags {
    display: flex;
    gap: 1rem;
    color: ${variables.colors.primaryStrong};
    & span {
      padding: 0.4rem 1.4rem;
      border-radius: 1.5rem;
      border: 0.1rem solid ${variables.colors.primarySoft};
    }
  }
`;

const ItemRight = css`
  display: flex;
  gap: 1rem;

  & button {
    display: block;
    width: 2rem;
    height: 2rem;
    background-image: url(${recordDelete});
    background-repeat: no-repeat;
    background-position: center;
  }
`;
