/* eslint-disable no-console */
import type {
  ICommentDelete,
  ICommentEdit,
  ICommentGetReq,
  ICommentReq,
} from '@/types/voteType';

import { auth } from './axios';

// 투표 등록
export const addVote = async (questionId: number, optionId: number) => {
  try {
    const { data } = await auth.post(
      `/api/v1/questions/${questionId}/options/${optionId}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 투표 취소
export const cancelVote = async (
  questionId: number,
  optionId: number | undefined,
) => {
  try {
    const { data } = await auth.delete(
      `/api/v1/questions/${questionId}/options/${optionId}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 댓글 생성
export const addComment = async ({ questionId, content }: ICommentReq) => {
  try {
    const { data } = await auth.post(
      `/api/v1/questions/${questionId}/comments`,
      {
        content,
      },
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 댓글 조회
export const getComment = async ({ questionId, page }: ICommentGetReq) => {
  try {
    const { data } = await auth.get(
      `/api/v1/questions/${questionId}/comments?page=${page}&size=10`,
    );
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

// 댓글 삭제
export const deleteComment = async ({
  questionId,
  commentId,
}: ICommentDelete) => {
  try {
    const { data } = await auth.delete(
      `/api/v1/questions/${questionId}/comments/${commentId}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 댓글 수정
export const editComment = async ({
  questionId,
  commentId,
  content,
}: ICommentEdit) => {
  try {
    const { data } = await auth.put(
      `/api/v1/questions/${questionId}/comments/${commentId}`,
      content,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 북마크 등록 및 해제
export const bookmarked = async (questionId: number) => {
  try {
    const { data } = await auth.post(
      `/api/v1/questions/${questionId}/bookmark`,
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
