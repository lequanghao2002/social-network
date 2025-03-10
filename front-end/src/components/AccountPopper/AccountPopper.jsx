import classNames from 'classnames/bind';
import styles from './AccountPopper.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';
import Image from '../Image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAfrica, faLock, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import userService from '~/services/userService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
dayjs.extend(relativeTime);
dayjs.extend(utc);

function AccountPopper({ data }) {
    const navigate = useNavigate();
    const [userById, setUserById] = useState({});

    useEffect(() => {
        fetchUserById(data.userId);
    }, []);

    const fetchUserById = async (Id) => {
        try {
            const result = await userService.getUserById(Id);
            setUserById(result);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    var user = data.user;

    const timeAgo = dayjs.utc(data.createdDate).local().fromNow();

    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview user={userById} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <>
            {user && (
                <Tippy
                    interactive
                    offset={[-150, -30]}
                    delay={[300, 100]}
                    placement="bottom-start"
                    render={renderPreview}
                >
                    <div className={cx('account-item')}>
                        <Image src={user.avatarUrl} alt={user.avatarUrl} />
                        <div
                            className={cx('item-info')}
                            onClick={() => {
                                navigate(`${config.routes.profile.replace(':id', data.userId)}`);
                            }}
                        >
                            <p className={cx('nickname')}>
                                <span>{user.firstName + ' ' + user.lastName}</span>
                            </p>
                            <p className={cx('time')}>
                                {data.status === 1 ? (
                                    <FontAwesomeIcon icon={faEarthAfrica} />
                                ) : data.status === 2 ? (
                                    <FontAwesomeIcon icon={faUserGroup} />
                                ) : data.status === 3 ? (
                                    <FontAwesomeIcon icon={faLock} />
                                ) : null}

                                <span>{timeAgo}</span>
                            </p>
                        </div>
                    </div>
                </Tippy>
            )}
        </>
    );
}

export default AccountPopper;
