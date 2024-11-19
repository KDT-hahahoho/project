/** @jsxImportSource @emotion/react */
import Button from '@components/common/Button';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CounselingListItem from './CounselingListItem';
import noRecord from '/img/no-counseling-record.svg';

export interface CounselingListData {
  id: number;
  summary: string;
  tags: string;
  count: number;
  created_at: string;
  updated_at: string;
  member_id: number;
}

const COUNSELINGLIST_URL = 'https://www.wishkr.site/counsels/records/';

const CounselingList = () => {
  const [counselingRecord, setCounselingRecord] = useState<CounselingListData[]>([]);
  const id = localStorage.getItem('MemberId');
  const navigate = useNavigate();

  const fetchCounselingData = async (): Promise<CounselingListData | undefined> => {
    try {
      const res = await axios.get(`${COUNSELINGLIST_URL}?member_id=${id}`, {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      });

      console.log(res.data.result.totalRecords);
      if (res.status === 200) setCounselingRecord(res.data.result.totalRecords);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  useEffect(() => {
    fetchCounselingData();
  }, []);

  console.log(counselingRecord);

  const counselingRecordItem = counselingRecord?.map((item) => (
    <CounselingListItem key={item.id} item={item} setCounselingRecord={setCounselingRecord} />
  ));

  return (
    <div>
      <div css={Header} className="header">
        <h2>위시 상담 목록</h2>
      </div>
      {counselingRecord && counselingRecord.length > 0 ? (
        <div css={RecordList}>{counselingRecordItem}</div>
      ) : (
        <div css={NoRecordCover}>
          <img src={noRecord} alt="상담 기록이 없습니다." />
        </div>
      )}

      <Button
        text="새로운 상담 시작하기"
        onClick={() => navigate('/counseling')}
        disabled={false}
        type="button"
        size="large"
        fixed={true}
      />
    </div>
  );
};

export default CounselingList;

const NoRecordCover = css`
  width: 100%;
  min-height: calc(100vh - ${variables.headerHeight});
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    object-fit: cover;
  }
`;

const Header = css`
  background-color: ${variables.colors.white};
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  max-width: 50rem;
  width: 100%;
  min-height: ${variables.headerHeight};
  padding: 1.8rem;
  box-shadow: 0 0 1rem rgba(217, 203, 245, 0.37);
  text-align: center;

  h2 {
    font-size: ${variables.size.large};
    font-weight: 700;
  }
`;

const RecordList = css`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: calc(${variables.headerHeight} + 1rem);
  margin-bottom: 8rem;
`;
