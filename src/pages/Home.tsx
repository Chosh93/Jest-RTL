import React from "react";
import {
  Container,
  TextInput,
  Button,
  Grid,
  Box,
  Text,
  Checkbox,
  Select,
  Switch,
  Title,
} from "@mantine/core";
import UPHomeMain, { UPHomeMainFilterState } from "../components/special/UPHome/UPHomeMain";

const Home = () => {
    return (
        <Container>
          <Box >
            <Title order={4}>고객 조회</Title>
            <Grid>
              <Grid.Col span={2}>
                <Select
                  label="기기정보"
                  data={['전체', 'PC', '모바일']}
                  defaultValue="전체"
                  styles={{
                    input: { fontSize: '16px', height: "40px" },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  label="상품번호"
                  placeholder="'-' 없이 숫자만 입력하세요"
                  styles={{
                    input: { fontSize: '16px', height: "40px" },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  label="생년월일"
                  placeholder="6자리 숫자를 입력하세요"
                  maxLength={6}
                  styles={{
                    input: { fontSize: '16px', height: "40px" },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <Button styles={{
                root: {
                  height: "40px", // TextInput과 동일한 높이로 설정
                  margin: "25px 0 0 0", // 여백 설정
                },
              }}>
                  조회
                </Button>
              </Grid.Col>
            </Grid>
            <Switch label="비대면" />
          </Box>
        </Container>
      );
};

export default Home;
