'use client';
import { useCallback, useEffect, useState } from 'react';

import {
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  Accordion,
  debounce,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePathname, useRouter } from 'next/navigation';
import { IoClose } from 'react-icons/io5';

import SearchInput from '@/app/wordpress-plugins/components/SearchInput/SearchInput';
import { Categories } from '@/app/wordpress-plugins/components/Categories';
import { SelectCtn } from '@/app/wordpress-plugins/components/Select';
import { SliderCtn } from '@/app/wordpress-plugins/components/Slider';
import { Input } from '@/app/wordpress-plugins/components/Input';

import styles from '../page.module.scss';

const phpVersions = [
  '8.3',
  '8.2',
  '8.1',
  '8.0',
  '7.4',
  '7.3',
  '7.2',
  'Not specified',
];
const wpVersions = [
  '6.3',
  '6.2',
  '6.1',
  '6.0',
  '5.9',
  '5.8',
  '5.7',
  '5.6',
  '5.5',
  '5.4',
  '5.3',
  '5.2',
  '5.1',
  '5.0',
  '4.9',
  '4.8',
  '4.7',
  '4.6',
  '4.5',
  '4.4',
  '4.3',
  '4.2',
  '4.1',
  '4.0',
  '3.9',
  '3.8',
  '3.7',
  '3.6',
  '3.5',
  '3.4',
  '3.3',
  '3.2',
  '3.1',
  '3.0',
  '2.9',
  '2.8',
  '2.7',
  '2.6',
  '2.5',
  '2.3',
  '2.2',
  '2.1',
  '2.0',
  '1.5',
  '1.2',
];
const accardionStyle = {
  '& .MuiAccordionSummary-root': {
    padding: '8px 0 !important',
    background: 'white',
    fontWeight: '700',
    fontsize: '16px',
    color: 'black',
  },
  '& .MuiAccordionDetails-root': {
    background: 'white',
    color: 'black',
    padding: '0',
  },
  '& .MuiSvgIcon-root': {
    fill: '#00000080',
  },
  '& .MuiTableCell-root': {
    border: 'none',
  },
};

export const Filter = ({
  setIsFilter,
  closeModal,
  categories,
  isFilter,
  plugins,
  setData,
  data,
  tag,
}: {
  data: {
    tags: { slug: string; tag: string }[];
    installationsRange?: [];
    category_id: string;
    ratingRang?: [];
    php: string;
    wp: string;
  };
  // eslint-disable-next-line no-unused-vars
  setData: (p: (state: any) => any) => void;
  // eslint-disable-next-line no-unused-vars
  setIsFilter: (e: boolean) => void;
  isFilter: boolean;
  closeModal?: any;
  categories: [];
  plugins: any;
  tag?: [];
}) => {
  const pathName = usePathname();
  const [initialRender, setInitialRender] = useState(false);
  const [rangeRating, setRangeRating] = useState([0, 5]);
  const [rangeInstalations, setRangeInstalations] = useState([0, 1000000]);
  const middleScreen = useMediaQuery('(max-width:1260px)');
  const [openPhp, setOpenPhp] = useState(false);
  const [openWordPress, setOpenWordPress] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (categories && data?.category_id) {
      const finded = categories?.slice(0, 9)?.find((cat: any) => cat.slug === data?.category_id)
      if (!finded) {
        setShowMore(true)
      }
    }
  },
    [categories, data?.category_id])
  const handleFilterData = (value: { slug: string }, name: string) => {
    setIsFilter(true);
    if (value && name) {
      setData((state) => {
        return { ...state, [name]: value?.slug };
      });
      //@ts-ignore
      router.push(`/wordpress-plugins/${value?.slug}`);
    }
  };
  const handlePhpVersionModal = () => {
    setOpenPhp(!openPhp);
    setOpenWordPress(false);
  };
  const handleWordPressVersionModal = () => {
    setOpenWordPress(!openWordPress);
    setOpenPhp(false);
  };

  useEffect(() => {
    const pathParts = pathName?.split('/');
    const id = pathParts[pathParts?.length - 2];
    if (id && id !== 'all') {
      if (pathParts[2] === 'tag') {
        setData((state) => {
          return { ...state, ['tags']: tag };
        });
      } else {
        setData((state) => {
          return { ...state, ['category_id']: id };
        });
      }
    }
    setInitialRender(true);
  }, []);

  useEffect(() => {
    if (isFilter) {
      if (data?.installationsRange) {
        setRangeInstalations(data?.installationsRange);
      } else if (data?.ratingRang) {
        setRangeRating(data?.ratingRang);
      }
    }
  }, [data, isFilter]);
  const handleMoreCategories = () => {
    setShowMore(!showMore);
  };
  const resetCategory = () => {
    setData((state) => {
      let newData = { ...state };
      delete newData['category_id'];
      return newData;
    });
    if (data?.tags?.length > 0) {
      router.push(`/wordpress-plugins/tag/${data?.tags[0]?.slug}`);
    } else {
      router.push('/wordpress-plugins/all');
    }
  };
  const handleSliderValue = (event: any, newValue: number[]) => {
    setIsFilter(true);
    const { name } = event.target;
    if (name === 'ratingRange') {
      setRangeRating(newValue);
    } else if (name === 'installationsRange') {
      setRangeInstalations(newValue);
    }
  };

  const updateData = useCallback(
    debounce((newRangeRating, name) => {
      setIsFilter(true);
      setData((state) => {
        const newValue = { ...state };
        newValue[name] = newRangeRating;
        return newValue;
      });
    }, 500),
    [],
  );

  useEffect(() => {
    if (isFilter) {
      updateData(rangeRating, 'ratingRange');
    }
  }, [rangeRating, updateData]);
  useEffect(() => {
    if (isFilter) {
      updateData(rangeInstalations, 'installationsRange');
    }
  }, [rangeInstalations, updateData]);
  const handleSliderInputValues = (e: any, index: number) => {
    const { value, name } = e.target;
    if (name === 'ratingRange') {
      if (/^(\d+(\.\d*)?|\.\d+)$/.test(value)) {
        setRangeRating((state) => {
          let newData = [...state];
          newData[index] = value;
          return newData;
        });
      } else {
        setRangeRating((state) => {
          let newData = [...state];
          newData[index] = 0;
          return newData;
        });
      }
    } else if (name === 'installationsRange') {
      if (/^(\d+(\.\d*)?|\.\d+)$/.test(value)) {
        setRangeInstalations((state) => {
          let newData = [...state];
          newData[index] = value;
          return newData;
        });
      } else {
        setRangeInstalations((state) => {
          let newData = [...state];
          newData[index] = 0;
          return newData;
        });
      }
    }
  };
  const handleVersions = (value: string, name: string) => {
    setIsFilter(true);
    setData((state) => {
      return { ...state, [name]: value };
    });
  };
  const handleTags = (tag?: { slug?: string; tag?: string; id?: string }) => {
    setIsFilter(true);
    if (!data?.category_id && !pathName?.includes('/wordpress-plugins/tag')) {
      router.push(`/wordpress-plugins/tag/${tag?.slug}`);
    } else {
      if (
        data?.tags?.length < 5 &&
        //@ts-ignore
        !data['tags']?.some((el: { id: string }) => el?.id === tag?.id)
      ) {
        setData((state) => {
          let newData = { ...state };
          newData['tags'] = [...newData['tags'], tag];
          //@ts-ignore
          if (!newData['tags']?.length > 0 && !data?.category_id) {
            router.push('/wordpress-plugins/all');
          }
          return newData;
        });
      }
    }
  };
  const removeTags = (tag?: { slug?: string; tag?: string; id?: string }) => {
    setIsFilter(true);
    setData((state) => {
      let newData = { ...state };
      if (newData['tags']?.some((el: { id: string }) => el?.id === tag?.id)) {
        newData['tags'] = newData['tags']?.filter(
          (el: { id: string }) => el?.id !== tag?.id,
        );
      }
      if (!(newData['tags']?.length > 0) && !data?.category_id) {
        router.push('/wordpress-plugins/all');
      }
      if (
        pathName?.split('/')[pathName?.length - 1] !== newData['tags'][0] &&
        !data?.category_id
      ) {
        router.push(`/wordpress-plugins/tag/${newData['tags'][0]?.slug}`);
      }
      return newData;
    });
  };

  return (
    <div className={styles.filter_ctn}>
      {middleScreen ? (
        <>
          <div className={styles.filter_header}>
            <span>Filter</span>
            <IoClose onClick={closeModal} cursor={'pointer'} size={22} />
          </div>
          <div className={styles.filters}>
            <Accordion sx={accardionStyle}>
              <AccordionSummary expandIcon={<ExpandMoreIcon fill={'white'} />}>
                Category
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.filter_item}>
                  <div className={styles.categories}>
                    <span
                      style={{
                        color: !data?.category_id ? 'black' : '#0000007F',
                      }}
                      onClick={resetCategory}
                    >
                      <div
                        className={
                          !data?.category_id ? styles.active : styles.inactive
                        }
                      ></div>
                      All Categories
                    </span>
                    {categories
                      ?.slice(0, 9)
                      ?.map((el: { slug: string; id: string }) => {
                        return (
                          <Categories
                            isSelected={data?.category_id === el?.slug}
                            //@ts-ignore
                            handleData={handleFilterData}
                            key={el?.id}
                            data={el}
                          />
                        );
                      })}
                    {showMore &&
                      categories
                        ?.slice(9, categories?.length)
                        ?.map((el: { slug: string; id: string }) => {
                          return (
                            <Categories
                              isSelected={data?.category_id === el?.slug}
                              //@ts-ignore
                              handleData={handleFilterData}
                              key={el?.id}
                              data={el}
                            />
                          );
                        })}
                  </div>
                  {categories?.length > 9 && (
                    <span
                      onClick={handleMoreCategories}
                      className={styles.more}
                    >
                      <div className={styles.inactive}></div>
                      {!showMore
                        ? `Show more (+${categories?.length - 9})`
                        : 'Show less'}
                    </span>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
            <div className={styles.line}></div>
            <Accordion sx={accardionStyle}>
              <AccordionSummary expandIcon={<ExpandMoreIcon fill={'white'} />}>
                Search by Tag
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.filter_item}>
                  <SearchInput
                    placeholder={'Tags...'}
                    handleTags={handleTags}
                    isTagSearch={true}
                    hideButton={true}
                  />
                  <div className={styles.tag_ctn}>
                    {data?.tags?.map((el: { tag: string }) => {
                      return (
                        <div key={el?.tag}>
                          <span>
                            {el?.tag[0]?.toUpperCase() + el?.tag?.substring(1)}
                          </span>
                          <IoClose
                            onClick={() => removeTags(el)}
                            color={'#00000080'}
                            cursor={'pointer'}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <div className={styles.line}></div>
            <Accordion sx={accardionStyle}>
              <AccordionSummary expandIcon={<ExpandMoreIcon fill={'white'} />}>
                Select version
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.filter_item}>
                  <SelectCtn
                    handleModal={handlePhpVersionModal}
                    handleData={handleVersions}
                    title="PHP version"
                    data={phpVersions}
                    value={data?.php}
                    open={openPhp}
                    name={'php'}
                  />
                  <SelectCtn
                    handleModal={handleWordPressVersionModal}
                    handleData={handleVersions}
                    title="WordPress version"
                    open={openWordPress}
                    data={wpVersions}
                    value={data?.wp}
                    name={'wp'}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <div className={styles.line}></div>
            <Accordion sx={accardionStyle}>
              <AccordionSummary expandIcon={<ExpandMoreIcon fill={'white'} />}>
                Filter by Review
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.filter_item}>
                  <SliderCtn
                    //@ts-ignore
                    value={rangeRating?.length > 0 ? rangeRating : [0, 0]}
                    handleSliderValue={handleSliderValue}
                    name={'ratingRange'}
                    step={0.1}
                    min={0}
                    max={5}
                  />
                  <Input
                    handleValue={handleSliderInputValues}
                    name={'ratingRange'}
                    //@ts-ignore
                    data={rangeRating}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <div className={styles.line}></div>
            <Accordion sx={accardionStyle}>
              <AccordionSummary expandIcon={<ExpandMoreIcon fill={'white'} />}>
                Filter by Active Installations
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.filter_item}>
                  <SliderCtn
                    value={
                      //@ts-ignore
                      rangeInstalations?.length > 0 ? rangeInstalations : [0, 0]
                    }
                    handleSliderValue={handleSliderValue}
                    name={'installationsRange'}
                    max={10000000}
                    step={100000}
                    min={0}
                  />
                  <Input
                    handleValue={handleSliderInputValues}
                    name={'installationsRange'}
                    //@ts-ignore
                    data={rangeInstalations}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <div className={styles.line}></div>
          </div>

          <button className={styles.btn} onClick={closeModal}>
            Apply ({plugins?.metadata?.totalCount})
          </button>
        </>
      ) : (
        <>
          <div className={styles.filter_item}>
            <h3>Find by Category</h3>
            <div className={styles.categories}>
              <span
                style={{ color: !data?.category_id ? 'black' : '#0000007F' }}
                onClick={resetCategory}
              >
                <div
                  className={
                    !data?.category_id ? styles.active : styles.inactive
                  }
                ></div>
                All Categories
              </span>
              {categories
                ?.slice(0, 9)
                ?.map((el: { slug: string; id: string }) => {
                  return (
                    <Categories
                      isSelected={data?.category_id === el?.slug}
                      //@ts-ignore
                      handleData={handleFilterData}
                      key={el?.id}
                      data={el}
                    />
                  );
                })}
              {showMore &&
                categories
                  ?.slice(9, categories?.length)
                  ?.map((el: { slug: string; id: string }) => {
                    return (
                      <Categories
                        isSelected={data?.category_id === el?.slug}
                        //@ts-ignore
                        handleData={handleFilterData}
                        key={el?.id}
                        data={el}
                      />
                    );
                  })}
            </div>
            {categories?.length > 9 && (
              <span onClick={handleMoreCategories} className={styles.more}>
                <div className={styles.inactive}></div>
                {!showMore
                  ? `Show more (+${categories?.length - 9})`
                  : 'Show less'}
              </span>
            )}
          </div>
          <div className={styles.divider}></div>
          <div className={styles.filter_item}>
            <h3>Search by Tag</h3>
            <SearchInput
              placeholder={'Tags...'}
              handleTags={handleTags}
              isTagSearch={true}
              hideButton={true}
              removeTag={removeTags}
              selectedTags={data?.tags}
            />
            <div className={styles.tag_ctn}>
              {data?.tags?.map((el: { tag: string }) => {
                return (
                  <div key={el?.tag}>
                    <span>
                      {el?.tag[0]?.toUpperCase() + el?.tag?.substring(1)}
                    </span>
                    <IoClose
                      onClick={() => removeTags(el)}
                      color={'#00000080'}
                      cursor={'pointer'}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.filter_item}>
            <h3>Select version</h3>
            <SelectCtn
              handleModal={handlePhpVersionModal}
              handleData={handleVersions}
              title="PHP version"
              data={phpVersions}
              value={data?.php}
              open={openPhp}
              name={'php'}
            />
            <SelectCtn
              handleModal={handleWordPressVersionModal}
              handleData={handleVersions}
              title="WordPress version"
              open={openWordPress}
              data={wpVersions}
              value={data?.wp}
              name={'wp'}
            />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.filter_item}>
            <h3>Filter by Review</h3>
            <SliderCtn
              //@ts-ignore
              value={rangeRating?.length > 0 ? rangeRating : [0, 0]}
              handleSliderValue={handleSliderValue}
              name={'ratingRange'}
              step={0.1}
              min={0}
              max={5}
            />
            <Input
              handleValue={handleSliderInputValues}
              name={'ratingRange'}
              //@ts-ignore
              data={rangeRating}
            />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.filter_item}>
            <h3>Filter by Active installation</h3>
            <SliderCtn
              value={
                //@ts-ignore
                rangeInstalations?.length > 0 ? rangeInstalations : [0, 0]
              }
              handleSliderValue={handleSliderValue}
              name={'installationsRange'}
              max={1000000}
              step={100000}
              min={0}
            />
            <Input
              handleValue={handleSliderInputValues}
              name={'installationsRange'}
              //@ts-ignore
              data={rangeInstalations}
            />
          </div>
        </>
      )}
    </div>
  );
};
