export interface Theme {
  background: string
  header: {
    background: string
    color: string
    size: string
  },
  letter: {
    border: string
    color: string;
    default: string
    invalid: string
    valid: string
  }
}

export const theme: Theme = {
  background: "#202124",
  header: {
    background: "#454545",
    color: "#FFFFFF",
    size: "26px"
  },
  letter: {
    border: "#538399",
    color: "#FFFFFF",
    default: "#777c7e",
    invalid: "#cdb445",
    valid: "#52ad5b"
  }
}
