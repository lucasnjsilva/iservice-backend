export interface ICreateEvaluation {
  comment?: string;
  vote: number;
  attendanceId: string;
}

export interface IUpdateEvaluation {
  comment?: string;
}
