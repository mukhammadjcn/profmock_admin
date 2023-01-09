import { Tabs } from "antd";
import { ISubject } from "src/types";
import { CatchError, LastPage } from "src/utils/index";
import React, { useEffect, useState } from "react";
import NoData from "src/components/animation/NoData";
import { Link, useSearchParams } from "react-router-dom";
import { GetUserSubjectsConfig } from "src/server/config/Urls";

const Resources: React.FC = () => {
  const [subject, setSubject] = useState<ISubject[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // For semestr
  const currentSemester = searchParams.get("semesterId");
  const [currentSem, setCurrentSem] = useState(
    currentSemester ? currentSemester : 1
  );

  const handleMakeParams = (key: any, value: any) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value);
      else searchParams.append(key, value);
    } else searchParams.delete(key);
    setSearchParams(searchParams);
  };
  const setSemester = async (val: any) => {
    setCurrentSem(val);
    handleMakeParams("semesterId", val);
    getSubjects();
    window.scrollTo(0, 0);
  };
  const urlMaker = () => {
    let url = "&";
    for (let key of searchParams.keys()) {
      let value = searchParams.get(key);
      url = url + `${url.length < 2 ? "" : "&"}${key}=${value}`;
    }
    return url.length > 2 ? url : "";
  };

  const getSubjects = async () => {
    try {
      const { data } = await GetUserSubjectsConfig(urlMaker());
      setSubject(data);
    } catch (error) {
      CatchError(error);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);
  return (
    <div className="profile__subjects">
      <Tabs
        onChange={setSemester}
        defaultActiveKey={currentSem.toString()}
        items={[
          {
            label: `1-semester`,
            key: "1",
          },
          {
            label: `2-semester`,
            key: "2",
          },
          {
            label: `3-semester`,
            key: "3",
          },
          {
            label: `4-semester`,
            key: "4",
          },
          {
            label: `5-semester`,
            key: "5",
          },
          {
            label: `6-semester`,
            key: "6",
          },
          {
            label: `7-semester`,
            key: "7",
          },
          {
            label: `8-semester`,
            key: "8",
          },
        ]}
      />

      {subject.length > 0 ? (
        subject.map((subject: ISubject) => (
          <Link
            onClick={LastPage}
            className="subject"
            key={subject.subjectDirectionEduId}
            to={`/profile/resources/subject?subjectDirectionEduId=${subject.subjectDirectionEduId}`}
          >
            <h1 className="subject__title">{subject.name}</h1>
            <div className="flex">
              <span className="subject__info">
                Mavzular soni: {subject.countTheme}
              </span>
              <span className="subject__info">
                Resurslar soni: {subject.countResource}
              </span>
            </div>
          </Link>
        ))
      ) : (
        <NoData title="Birorta fan mavjud emas )" />
      )}
    </div>
  );
};

export default Resources;
