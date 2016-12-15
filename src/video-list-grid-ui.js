// video-list-grid-ui.js - A video list grid React component for Toby
// Copyright (C) 2016 Frank Hale <frankhale@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

class VideoListGrid extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      applyFilter: ""
    };
  }
  componentDidMount() {
    this.updateViewBasedOnProps(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.updateViewBasedOnProps(nextProps);
  }
  updateViewBasedOnProps(nextProps) {
    let videos = [];

    // docs for componentWillReceiveProps says to check if nextProps is 
    // different than this.props and make changes accordingly. I'm skipping that
    // for now...Additionally I need to go back and check all components that
    // recieve props like this to make sure I perform the necessary checks.

    if(nextProps.data !== undefined && nextProps.data.length > 0) {
      videos = nextProps.data.map((d, i) => {
        return {
          playVideo: d.playVideo,
          title: d.title,
          ytid: d.ytid,
          group: d.group,
          thumbnail: d.thumbnail
        };
      });
    }

    this.setState({
      data: videos,
      applyFilter: (nextProps.applyFilter !== undefined) ? nextProps.applyFilter : ""
    });
  }
  render() {
    return (
      <div>
      {
        this.state.data.map((d, i) => {
          return <img src={d.thumbnail} title={d.title} key={i} className={"videoThumbnailSlim " + this.state.applyFilter} onClick={d.playVideo.bind(this, d, this.state.data)}></img>;
        })
      }
      </div>
    );
  }
}
