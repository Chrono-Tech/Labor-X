import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import get from "lodash/get"
import { JobModel, BoardModel, ProfileModel, JobNoticeModel, JOB_STATE_PENDING_START } from 'src/models'
import PersonModel from "../../../api/backend/model/PersonModel"
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import css from './DeclineJobCard.scss'

const dateFormat = 'h:mm A'

const DEFAULT_AVATAR = "/static/temp/icon-profile.jpg"

class DeclineJobCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel),
    board: PropTypes.instanceOf(BoardModel),
    notice: PropTypes.instanceOf(JobNoticeModel),
    workerPerson: PropTypes.instanceOf(PersonModel),
    onClickReview: PropTypes.func,
    confirmStartWork: PropTypes.func,
    openPayInvoiceDialog: PropTypes.func,
    onHandleDelegate: PropTypes.func,
  }

  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleDelegate () {
    this.props.onHandleDelegate();
  }

  render () {
    const { job, workerPerson } = this.props
    const { anchorEl } = this.state
    return (
      <div>
        <Card className={css.card}>
          <CardHeader
            action = {
              <div className={css.wrapCosts}>
                <span className={css.cost}>LHT 0.00 / 2.00</span>
                <span className={css.cost}>LHT 0.00 / 2.00</span>
              </div>
            }
            title = {
              <div className={css.label}>Declined</div>
            }
            subheader = {
              <div className={css.cardName}>Pick-up 3 sofas"</div>
            }
          />
          <Divider />
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={css.avatar}>
                <img src={ get(workerPerson, "avatar") || DEFAULT_AVATAR  } />
              </Avatar>
            }
            action={
              <div>
                <Button onClick={() => this.handleDelegate()}> <span className={css.delegateButton}> Delegate </span> </Button>
                <IconButton
                  aria-label="More"
                  aria-owns={anchorEl ? 'long-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon className={css.moreVertIcon} />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 150,
                      width: 200,
                    },
                  }}
                >
                  <MenuItem onClick={this.handleClose}>
                    Pay
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    Send for Re-Do
                  </MenuItem>
                </Menu>
              </div>
            }
            title = {
              <div className={css.workerName}> James Harvey (Worker) </div>
            }
          />
        </Card>
      </div>
    )
  }
}


export default DeclineJobCard
