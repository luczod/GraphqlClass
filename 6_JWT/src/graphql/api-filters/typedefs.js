// localhost:4005/posts?_start=0&_limit=2
// underline nao é obrigatorio
import { gql } from "apollo-server-core";

export const ApiFiltersTypeDefs = gql`
  input ApiFiltersinput {
    _sort: String
    _order: ApiFilterOrder
    _start: Int
    _limit: Int
  }

  enum ApiFilterOrder {
    ASC
    DESC
  }
`;
